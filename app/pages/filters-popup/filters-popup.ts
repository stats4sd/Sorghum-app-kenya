import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import {SeedMasterData} from "../../providers/seed-master-data/seed-master-data";

@Component({
  templateUrl: 'build/pages/filters-popup/filters-popup.html',
})

export class FiltersPopupPage {
  filteredData:any;
  boundArrays:any;
  filters:any;

  static get parameters() {
    return [[NavController], [SeedMasterData], [ViewController]];
  }

  constructor(private nav: NavController, private seedMasterData:SeedMasterData, private viewCtrl:ViewController) {
    this.seedMasterData=seedMasterData;
    this.initData();
    this.setFilterBounds(['Grain yield','Days to 50% Flowering']);
    this.resetFilters();

  }

  initData(){
    //need to work with averages not trial data here! Possibly with seed stats max,min etc could be precalculated...
    this.filteredData=this.seedMasterData.data.trialData;
  }
  resetFilters(){
    this.filters={
      'Grain yield':{
        lower:this.boundArrays['Grain yield'].min,
        upper:this.boundArrays['Grain yield'].max,
        step:this.boundArrays['Grain yield'].step
      },
      'Days to 50% Flowering':{
        lower:this.boundArrays['Days to 50% Flowering'].min,
        upper:this.boundArrays['Days to 50% Flowering'].max,
        step:this.boundArrays['Days to 50% Flowering'].step
      },
      'Suppliers':{
        'Rongo University College':true
      }
    };
    this.initData();
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    let filteredData = "test";
    this.dismiss(filteredData);
  }

  dismiss(data) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }

  //iterate data over array of keys, calculating max and min values for each key and rounding
  setFilterBounds(keys){
    this.boundArrays={};
    let trialData=this.seedMasterData.data.trialData;
    for (let trial of trialData){
      for(let key of keys){
        if(trial[key]){
          let val=trial[key];
          if(!this.boundArrays[key]){this.boundArrays[key]={min:val,max:val}}
          if(val<this.boundArrays[key].min){this.boundArrays[key].min=Math.floor(val)}
          else if (val>this.boundArrays[key].max){this.boundArrays[key].max=Math.ceil(val)}
        }
      }
    }
    //perform rounding and put split size as deciles
    for (let bound in this.boundArrays){
      this.boundArrays[bound].step=0.5;
    }
    console.log(this.boundArrays);
  }

  //NOT WORKING CORRECTLY, won't pull back in data previously lost, need to run all filters together in case of relaxing filters
  rangeChange(key){
    let filtered=[];
    for(let item of this.filteredData){
      if(item[key]>=this.filters[key].lower && item[key]<=this.filters[key].upper){
        filtered.push(item)
      }
    }
    this.filteredData=filtered;
    console.log(this.filteredData.length);
  }

  suppliersFilter(supplier){
    console.log(supplier)
  }

}
