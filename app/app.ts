import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {WpApi} from './providers/wp-api/wp-api';
import {AppProvider} from './providers/wp-api/app-provider';

import {LoginPage} from './pages/login/login';


@Component({
  templateUrl: 'build/app.html'
})
export class SearchPointApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  //private rootPage:any;

  constructor(private platform:Platform) {
    //this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(SearchPointApp,[WpApi, AppProvider])
