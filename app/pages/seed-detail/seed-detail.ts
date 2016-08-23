import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {InfoTabPage} from "./info-tab";
import {SuppliersTabPage} from "./suppliers-tab";
import {PerformanceTabPage} from "./performance-tab";


@Component({
  template: `
  <ion-header><ion-navbar><ion-title>{{seedData.Genotypes}}</ion-title></ion-navbar></ion-header>
    <ion-tabs>
        <ion-tab tabIcon="information-circle" tabTitle="Seed" [root]="tab1" [rootParams]="seedData"></ion-tab>
        <ion-tab tabIcon="cart" tabTitle="Suppliers" [root]="tab2" [rootParams]="seedData"></ion-tab>
        <ion-tab tabIcon="stats" tabTitle="Performance" [root]="tab3" [rootParams]="seedData"></ion-tab>
      </ion-tabs>
 `

})
export class SeedDetailPage {
  seedData:any;
  tab1:any;
  tab2:any;
  tab3:any;

  constructor(private nav: NavController, params:NavParams) {
    this.seedData=params.data.seed;
    console.log(this.seedData);
    this.tab1=InfoTabPage;
    this.tab2=SuppliersTabPage;
    this.tab3=PerformanceTabPage;
  }

}
