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

  constructor(private http: Http) {
    this.data = null;
    this.summaries={}
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
  //iterate over each trial, merge by genotype into key and arrays of values
  mergeTrialData(data){
    let summaries={};
    for (let trial of data){
      if(summaries[trial.Genotypes]==undefined){summaries[trial.Genotypes]={}}
      for (let key in trial){
        if(summaries[trial.Genotypes][key]==undefined){summaries[trial.Genotypes][key]=[]}
        summaries[trial.Genotypes][key].push(trial[key])
      }
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

}

