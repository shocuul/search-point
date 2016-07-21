import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Item} from '../../providers/wp-api/data-clases';
//import { GOOGLE_MAPS_DIRECTIVES, GOOGLE_MAPS_PROVIDERS } from 'angular2-google-maps/core';
import {DENETHIEL_MAPS_DIRECTIVES, DENETHIEL_MAPS_PROVIDERS} from '../../providers/google-maps'
/*
  Generated class for the ItemPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/item/item.html',
  directives:[DENETHIEL_MAPS_DIRECTIVES],
  providers:[DENETHIEL_MAPS_PROVIDERS]
})
export class ItemPage {

  item:Item;
  constructor(private nav: NavController, private params: NavParams ) {
    this.item = params.get('item');
    console.log(this.item);
  }

}
