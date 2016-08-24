import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SeedMasterData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SeedMasterData {
  data: any;
  summaries:any;
  trialMeta:any;

  constructor(private http: Http) {
    this.data = null;
    this.summaries={};
    this.trialMeta={};
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.http.get('data/seedMasterData.json').subscribe(res => {
        this.data=res.json();
        console.log(this.data);
        this.mergeTrialData(this.data.trialData);
        this.listSuppliersBySeed(this.data.supplierData);
        resolve(this.data);
      });
    });
  }
  //iterate over each trial, merge by genotype into key and arrays of values and also push seperate trials into meta
  mergeTrialData(data){
    let summaries={};
    for (let trial of data){
      if(summaries[trial.Genotypes]==undefined){summaries[trial.Genotypes]={}}
      if(this.trialMeta[trial['Trial Name']]==undefined){this.trialMeta[trial['Trial Name']]={stats:{},trials:[]}}
      this.trialMeta[trial['Trial Name']].trials.push(trial);
      for (let key in trial){
        if(summaries[trial.Genotypes][key]==undefined){summaries[trial.Genotypes][key]=[]}
        summaries[trial.Genotypes][key].push(trial[key])
      }
    }
    //calculate overall summary stats of each trial name
    for (let trial in this.trialMeta){
      this.trialMeta[trial].stats=this.calculateStats(this.trialMeta[trial].trials)
    }
    this.summaries=summaries;
  }

  //iterate over supplier data and convert to make list of suppliers by seed genotype
  listSuppliersBySeed(data){
    this.data.suppliersBySeed={};
    for (let supplier of data){
      var varieties=supplier.Varieties;
      for (let variety of varieties){
        if (!this.data.suppliersBySeed[variety]){this.data.suppliersBySeed[variety]=[]}
        this.data.suppliersBySeed[variety].push(supplier)
      }
    }
  }
  //iterate over each key in array, pushing stats to calculate sumx and n for numeric data,
  //as well as tracking all values and unique counts for all data
  calculateStats(array){
    var stats={};
    for (let item of array){
      //iterate over each json key, if create unique count as well as averages
      //also push lat/lon to one variable to make easier to track
      if(item['Location Latitude']&&item['Location Longitude']){
        item.Location=item['Location Latitude']+','+item['Location Longitude']
      }
      for (let key in item){
        if (!stats[key]){stats[key]={n:0,sumX:0,values:[],uniqueCount:{}}}
        if(typeof item[key]=='number') {
          stats[key].sumX = stats[key].sumX + item[key];
        }
          stats[key].n = stats[key].n + 1;
          if(!stats[key].uniqueCount[item[key]]){stats[key].uniqueCount[item[key]]=0}
          stats[key].uniqueCount[item[key]]++;
          stats[key].values.push(item[key]);
        }
      }
    for (let key in stats){
      if(stats[key].sumX!=0){
        stats[key].mean=parseFloat((stats[key].sumX/stats[key].n).toPrecision(3));
      }
    }
    //calculate overall means and return as formatted
    return(stats)
  }

}

