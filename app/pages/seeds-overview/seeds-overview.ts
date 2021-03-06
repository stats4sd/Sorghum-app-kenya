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
  allItems:any;
  filteredItems:any;
  filteredItemsPreSearch:any;
  activeFilters:any;
  searchQuery:any;

  constructor(private nav: NavController, private seedMasterData:SeedMasterData) {
    this.nav = nav;
    this.seedMasterData = seedMasterData;
    this.seedSummaries=calculateStats(seedMasterData);
    this.initializeItems();
  }

  presentFilter() {
    let modal = Modal.create(FiltersPopupPage, {masterData:this.allItems, activeFilters:this.activeFilters, filteredData:this.filteredItems});
    this.nav.present(modal);
    modal.onDismiss(data => {
      if(data){
        console.log('modal dismissed');
        console.log(data);
        this.filteredItems=data.filteredData;
        this.filteredItemsPreSearch=data.filteredData;
        this.activeFilters=data.activeFilters;
      }

    });
  }

  goToSeedDetail(seedData) {
    this.nav.push(SeedDetailPage, {seed:seedData});
  }

  initializeItems() {
    this.allItems = this.seedSummaries;
    this.filteredItems=this.seedSummaries;
    this.filteredItemsPreSearch=this.filteredItems;
    console.log(this.filteredItems);
    this.searchResults=this.filteredItems.length;
  }

  searchVarieties(event) {
    // Reset items back to all of the items
    this.filteredItems=this.filteredItemsPreSearch;
    // set q to the value of the searchbar
    var q = this.searchQuery;
    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      return;
    }
    this.filteredItems = this.filteredItems.filter((v) => {
      if (v.Genotypes.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
    this.searchResults=this.filteredItems.length;
  }


}

//iterate over seed summaries and calculate mean. Push to new array
function calculateStats(seedMasterData) {
  var seedStatArray=[];
  var seedList=seedMasterData.data.seedData;
  var seedSummaries=seedMasterData.summaries;
  for (let seed of seedList) {
    if(seedSummaries[seed.Genotype]){
      //calculate stats of listed fields - better in future to calculate type for all fields and summarise appropriately
      var stats = arrayMean(seedSummaries[seed.Genotype],['Grain yield','Days to 50% Flowering','Cost', 'Panicle Width', 'Panicle Length', 'Plant Height']);
      seedSummaries[seed.Genotype]=stats;
      //convert back to array and rewrite genotype field to just be first entry out of trial summary array
      seedSummaries[seed.Genotype].Genotypes=seedSummaries[seed.Genotype].Genotypes[0];
      seedStatArray.push(seedSummaries[seed.Genotype])
    }
  }
  return seedStatArray
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
    array[key] = {values: array[key], mean: parseFloat(mean.toPrecision(3))};
  }
  }
  return array
}