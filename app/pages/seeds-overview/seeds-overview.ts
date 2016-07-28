import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SeedMasterData} from '../../providers/seed-master-data/seed-master-data'
import {SeedDetailPage} from "../seed-detail/seed-detail";
import {FiltersPopupPage} from "../filters-popup/filters-popup";
import {Modal} from "ionic-angular/index";


@Component({
  templateUrl: 'build/pages/seeds-overview/seeds-overview.html',
})
export class SeedsOverviewPage {

  static get parameters() {
    return [[NavController], [SeedMasterData]];
  }
  items:any;
  v:any;
  searchResults:number;

  constructor(private nav: NavController, private seedMasterData:SeedMasterData) {
    this.nav = nav;
    this.seedMasterData = seedMasterData;
    console.log(this.seedMasterData);
    this.initializeItems();

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
      console.log(v.Genotypes.toLowerCase().indexOf(q.toLowerCase()));
      if (v.Genotypes.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
    this.searchResults=this.items.length;
  }

}
