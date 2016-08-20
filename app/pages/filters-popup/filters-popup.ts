import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import {SeedMasterData} from "../../providers/seed-master-data/seed-master-data";

@Component({
  templateUrl: 'build/pages/filters-popup/filters-popup.html',
})

export class FiltersPopupPage {
  filteredData:any;
  boundArrays:any;
  filters:any;
  filterKeysNumerical:any;
  filterKeysSuppliers:any;
  masterData:any;
  continue:boolean=true;


  constructor(private viewCtrl:ViewController, private params:NavParams) {
    this.params=params;
    this.masterData=json2Array(this.params.data);
    console.log(this.params.data);
    this.cacheFilterResults;
    this.filterKeysNumerical=['Grain yield','Days to 50% Flowering'];
    this.setFilterBounds(this.filterKeysNumerical);
    this.filterKeysSuppliers=['Rongo University College'];
    this.resetFilters();
  }

  cacheFilterResults(){

  }

  resetFilters() {
    this.filters = {};
    for (let key of this.filterKeysNumerical) {
      if(!this.filters[key]){this.filters[key]={}}
      this.filters[key] = {
        lower: this.boundArrays[key].min,
        upper: this.boundArrays[key].max,
        step: this.boundArrays[key].step
      }
    }
    for (let key of this.filterKeysSuppliers) {
      this.filters.Suppliers={};
      this.filters.Suppliers[key] = true
    }
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    console.log('applying filters');
    //var data = array2Json(this.filteredData);
    this.dismiss(this.filteredData);
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

  //iterate data over array of keys, calculating max and min values for each key and rounding
  setFilterBounds(keys){
    this.boundArrays={};
    let seeds=this.masterData;
    for (let seed of seeds){
      console.log(seed)
      for(let key of keys){
        if(seed[key]){
          let val=seed[key].mean;
          if(!this.boundArrays[key]){this.boundArrays[key]={min:val,max:val,step:1}}
          if(val<this.boundArrays[key].min){this.boundArrays[key].min=Math.floor(val)}
          else if (val>this.boundArrays[key].max){this.boundArrays[key].max=Math.ceil(val)}
        }
      }
    }
    //split size as deciles
    for (let bound in this.boundArrays){
      console.log(this.boundArrays);
      this.boundArrays[bound].step=(this.boundArrays[bound].max-this.boundArrays[bound].min)/10;
      /*this.boundArrays[bound].step=0.5;*/
    }
    console.log(this.boundArrays);
  }

  rangeChange(){
    console.log(this.filteredData.length)
    for(let i=0;i<this.filteredData.length;i++){
      if(this.filteredData[i]){var item=this.filteredData[i]}
      else{break}
      itemTest:{
        for(let key of this.filterKeysNumerical){
          var mean=parseFloat(item[key].mean)
          if(mean<this.filters[key].lower || mean>this.filters[key].upper)
          {
          this.filteredData.splice(i,1);
          i=i-1;
            break itemTest;
          }
        }
      }
    }
    console.log(tempString(this.filteredData))
  }

  suppliersFilter(supplier){
    console.log(supplier)
  }

}

function json2Array(json){
  var array=[];
  for(let key in json){
    array.push(json[key])
  }
  return array;
}

function array2Json(array){
  var json={};
  for(let el of array){
    json[el.Genotypes[0]]=el
  }
  return json
}

function tempString(array){
  var temp=[];
  for(let el of array) {
    temp.push(el['Grain yield'].mean)
  }
  return temp;
}