import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SeedMasterData} from '../../providers/seed-master-data/seed-master-data'
import {SeedDetailPage} from "../seed-detail/seed-detail";
import {FiltersPopupPage} from "../filters-popup/filters-popup";
import {Modal} from "ionic-angular/index";
import {SummarisePipe} from './../../pipes/summarise-pipe'


@Component({
  templateUrl: 'build/pages/seeds-overview/seeds-overview.html',
  pipes:[SummarisePipe]
})
export class SeedsOverviewPage {

  static get parameters() {
    return [[NavController], [SeedMasterData]];
  }
  items:any;
  v:any;
  searchResults:number;
  seedSummaries:any;

  constructor(private nav: NavController, private seedMasterData:SeedMasterData) {
    this.nav = nav;
    this.seedMasterData = seedMasterData;
    console.log(this.seedMasterData);
    this.initializeItems();
    //calculate mean summaries
    this.seedSummaries=calculateStats(seedMasterData);
    console.log(this.seedSummaries);
    //console.log(this.seedSummaries);

  }

  presentFilter() {
    let modal = Modal.create(FiltersPopupPage, {});
    this.nav.present(modal);
    modal.onDismiss(data => {
      console.log(data);
      if (data) {
        this.searchResults = data;
      }
    });
  }

  goToSeedDetail(seedData) {
    console.log(seedData);
    this.nav.push(SeedDetailPage, {seed:seedData});
  }

  initializeItems() {
    this.items = this.seedMasterData.data.seedData;
    this.searchResults=this.items.length;
  }

  searchVarieties(event) {
    // Reset items back to all of the items
    this.initializeItems();
    // set q to the value of the searchbar
    var q = event.srcElement.value;
    console.log(q);
    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      return;
    }
    this.items = this.items.filter((v) => {
      console.log(v.Genotype.toLowerCase().indexOf(q.toLowerCase()));
      if (v.Genotype.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
    this.searchResults=this.items.length;
  }


}

function calculateStats(seedMasterData) {
  var seedList=seedMasterData.data.seedData;
  var seedSummaries=seedMasterData.summaries;
  for (let seed of seedList) {
    if(seedSummaries[seed.Genotype]){
      var stats = arrayMean(seedSummaries[seed.Genotype],['Grain yield','Days to 50% Flowering','Cost']);
      seedSummaries[seed.Genotype]=stats
    }
  }
  return seedSummaries
}

function arrayMean(array,keys){
  for(let key of keys) {
    let temp = null;
    if(array[key]==undefined){array[key]={values:'no data',mean:'no data'}}
    else{
    for (let x of array[key]) {
      temp = temp + x;
    }
    var mean = temp / array[key].length;
    array[key] = {values: array[key], mean: mean.toPrecision(3)};
  }
  }
  return array
}