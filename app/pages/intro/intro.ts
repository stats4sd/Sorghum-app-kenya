import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SeedsOverviewPage} from '../seeds-overview/seeds-overview'

interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  templateUrl: 'build/pages/intro/intro.html',
})

export class IntroPage {

  slides: Slide[];
  showSkip:boolean;

  constructor(private nav: NavController) {
    this.showSkip=true;
    this.slides = [
      {
        title: "<b>Sorghum Variety Catalogue</b>",
        description: "This application aims to demonstrate ideas to help gather and share seed variety information between farmers, suppliers and researchers",
        image: "img/tutorial/tutorial1.png",
      },
      {
        title: "Seed, Supplier and Performance Data",
        description: "The app provides information on known seed varieties and their available sellers",
        image: "img/tutorial/tutorial2.png",
      },
      {
        title: "Search and Filter",
        description: "Find the best seeds based on characteristics and requirements",
        image: "img/tutorial/tutorial3.png",
      }
    ];
  }
  startApp() {
    this.nav.push(SeedsOverviewPage);
  }

  onSlideChangeStart(slider) {
    //this.showSkip = !slider.isEnd;
  }

  onPageDidEnter() {
    // the left menu should be disabled on the tutorial page
    //this.menu.enable(false);
  }

  onPageDidLeave() {
    // enable the left menu when leaving the tutorial page
    //this.menu.enable(true);
  }

}
