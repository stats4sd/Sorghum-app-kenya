import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NavParams} from "ionic-angular/index";


@Component({
  templateUrl: 'build/pages/seed-detail/info-tab.html',
})
export class InfoTabPage {
  seedData:any;

  constructor(private nav: NavController, params:NavParams) {
    this.seedData=params.data;
  }

}
