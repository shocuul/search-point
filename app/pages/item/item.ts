import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Item} from '../../providers/wp-api/data-clases';

/*
  Generated class for the ItemPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/item/item.html',
})
export class ItemPage {

  item:Item;
  constructor(private nav: NavController, private params: NavParams ) {
    this.item = params.get('item');
    console.log(this.item);
  }

}
