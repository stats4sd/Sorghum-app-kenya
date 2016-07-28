import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NavParams} from "ionic-angular/index";

@Component({
  templateUrl: 'build/pages/seed-detail/suppliers-tab.html',
})
export class SuppliersTabPage {
  seedData:any;

  constructor(private nav: NavController, params:NavParams) {
    console.log(params);
    this.seedData=params.data;
    console.log(this.seedData);
  }

}
