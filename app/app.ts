import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {IntroPage} from './pages/intro/intro';
import {SeedMasterData} from './providers/seed-master-data/seed-master-data'


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers:[SeedMasterData]
})
export class MyApp {

  private rootPage:any;

  constructor(private platform:Platform, seedMasterData:SeedMasterData) {
    this.rootPage = IntroPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
    seedMasterData.load();
  }
}

ionicBootstrap(MyApp);
