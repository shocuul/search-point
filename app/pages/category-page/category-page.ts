import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Category} from '../../providers/wp-api/data-clases';

/*
  Generated class for the CategoryPagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/category-page/category-page.html',
})
export class CategoryPage {

  cat: Category;
  constructor(private nav: NavController,private params: NavParams) {
    this.cat = params.get('category');
  }

}
