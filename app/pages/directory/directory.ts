import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AppProvider} from '../../providers/wp-api/app-provider';
import {CategoryPage} from '../category-page/category-page'
import {Category} from '../../providers/wp-api/data-clases';

@Component({
  templateUrl: 'build/pages/directory/directory.html',
  providers:[]
})
export class DirectoryPage {
  constructor(private navController: NavController, private appProvider: AppProvider) {
  }
  goToCategory(cat: Category){
    this.navController.push(CategoryPage,{category:cat, app:this.appProvider});
  }
}
