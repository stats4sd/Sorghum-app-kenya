import { Component } from '@angular/core';
import { ViewController, NavParams, Toast } from 'ionic-angular';
import {SeedMasterData} from "../../providers/seed-master-data/seed-master-data";
import {NavController} from "ionic-angular/index";

@Component({
  templateUrl: 'build/pages/filters-popup/filters-popup.html',
})

export class FiltersPopupPage {
  public remaining:number;
  filteredData:any;
  boundArrays:any;
  filterKeysNumerical:any=['Grain yield','Days to 50% Flowering'];
  filterKeysSuppliers:any=['Rongo University College'];
  masterData:any;
  activeFilters:any;
  filtersEnabled:boolean=false;

//note - need to pass active filters back and forth...

  constructor(private viewCtrl:ViewController, private params:NavParams, private nav:NavController) {
    //load any previous filters and filtered data from params, set filter bounds and apply active filters
    this.params=params;
    this.nav=nav;
    this.masterData=params.data.masterData;
    this.filteredData=params.data.filteredData;
    this.setFilterBounds(this.filterKeysNumerical);
    this.activeFilters=params.data.activeFilters;
    if(!this.activeFilters){this.resetFilters()}
    this.remaining=this.filteredData.length
  }


  resetFilters() {
    this.activeFilters={};
    this.filtersEnabled=false;
    console.log('resetting filters');
    this.filteredData=this.masterData;
    this.remaining=this.masterData.length;
    for (let key of this.filterKeysNumerical) {
      if(!this.activeFilters[key]){this.activeFilters[key]={}}
      this.activeFilters[key] = {
        lower: this.boundArrays[key].min,
        upper: this.boundArrays[key].max,
        step: this.boundArrays[key].step
      }
    }
    for (let key of this.filterKeysSuppliers) {
      this.activeFilters.Suppliers={};
      this.activeFilters.Suppliers[key] = true
    }
  }

  applyFilters() {
    console.log('applying filters');
    this.dismiss({filteredData:this.filteredData, activeFilters:this.activeFilters});
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

 /* presentToast(){
    let toast = Toast.create({
      message:this.remaining +' varieties remaining',
      duration: 1000,
      position: 'top',
      showCloseButton: true
    });
    this.nav.present(toast);
  }*/

  //iterate data over array of keys, calculating max and min values for each key and rounding
  setFilterBounds(keys){
    this.boundArrays={};
    let seeds=this.masterData;
    for (let seed of seeds){
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
      this.boundArrays[bound].step=(this.boundArrays[bound].max-this.boundArrays[bound].min)/10;
      /*this.boundArrays[bound].step=0.5;*/
    }
    console.log(this.boundArrays);
  }

  rangeChange(){
    console.log('range changed');
    this.filteredData=this.masterData;
    for (let numericFilter of this.filterKeysNumerical){
      this.filterNumeric(numericFilter)
    }
    console.log(this.filteredData);
    this.remaining = this.filteredData.length;
  }

  filterNumeric(filterKey){
    var newFiltered=[];
    if(this.activeFilters[filterKey]){
      for (let seed of this.filteredData){
        var mean =parseFloat(seed[filterKey].mean);
        if(mean>this.activeFilters[filterKey].lower && mean<this.activeFilters[filterKey].upper){
          newFiltered.push(seed)
        }
      }
    }
    this.filteredData=newFiltered;
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