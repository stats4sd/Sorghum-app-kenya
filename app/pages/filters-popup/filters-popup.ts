import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SeedMasterData} from "../../providers/seed-master-data/seed-master-data";
import {ViewController} from "ionic-angular/index";

@Component({
  templateUrl: 'build/pages/filters-popup/filters-popup.html',
})
export class FiltersPopupPage {
  filteredData:any;

  static get parameters() {
    return [[NavController], [SeedMasterData]];
  }

  constructor(private nav: NavController, private seedMasterData:SeedMasterData, private viewCtrl:ViewController) {
    this.seedMasterData=seedMasterData;
    this.initData();
  }

  initData(){
    this.filteredData=this.seedMasterData.data.seedData;
    console.log(this.filteredData);
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    let filteredData = "test";
    this.dismiss(filteredData);
  }

  resetFilters(){

  }

  dismiss(data) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }

}
