import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, Nav } from 'ionic-angular';
import {SeedsOverviewPage} from "../seeds-overview/seeds-overview";

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl: 'build/pages/menu/menu.html',
})
export class MenuPage {

  @ViewChild(Nav) nav: Nav;

  private root = SeedsOverviewPage;
  menu:MenuController;
  appPages:PageObj[] = [
    {title: 'Varieties', icon: 'apps', component: SeedsOverviewPage},
    {title: 'Suppliers', icon: 'map', component: SeedsOverviewPage},
  ];
  loggedIn = false;
  loggedInPages:PageObj[] = [
    {title: 'Account', component: SeedsOverviewPage, icon: 'person'},
    {title: 'Logout', component: SeedsOverviewPage, icon: 'log-out'}
  ];
  loggedOutPages:PageObj[] = [
    {title: 'Login', component: SeedsOverviewPage, icon: 'log-in'},
    {title: 'Signup', component: SeedsOverviewPage, icon: 'person-add'}
  ];

  constructor() {


  }

  openPage(page: PageObj) {
    // find the nav component and set what the root page should be
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario

    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      this.nav.setRoot(page.component);
    }

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      /*setTimeout(() => {
       this.userData.logout();
       }, 1000);
       */
    }

  }
}
