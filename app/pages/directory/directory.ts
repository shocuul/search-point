import {Component, OnInit} from '@angular/core';
import {NavController, Popover, LoadingController, PopoverController} from 'ionic-angular';
import {AppProvider} from '../../providers/wp-api/app-provider';
import {CategoryPage} from '../category-page/category-page'
import {Category} from '../../providers/wp-api/data-clases';
import {Geolocation} from 'ionic-native';
import {LocationPopover} from './location'

@Component({
  templateUrl: 'build/pages/directory/directory.html',
  providers:[AppProvider]
})
export class DirectoryPage implements OnInit {
  constructor(private navController: NavController, 
  public appProvider: AppProvider,
  public loadingCtrl: LoadingController,
  public popoverCtrl: PopoverController) {
  }

  ngOnInit(){
    let loading = this.loadingCtrl.create({
      content: 'Cargando categorias...'
    })
    loading.present();
    Geolocation.getCurrentPosition().then((resp)=>{
      this.appProvider.getItems(resp.coords.latitude,resp.coords.longitude);
      this.appProvider.filteredCategories$.subscribe((data) => {
        if(data.length != 0 ){
          loading.dismiss();
        }
      })
    })
  }

  goToCategory(cat: Category){
    this.appProvider.filterItems(cat._id);
    this.navController.push(CategoryPage,{category:cat, app:this.appProvider});
  }

  showLocationPopover(ev){
    let popover = this.popoverCtrl.create(LocationPopover,{provider:this.appProvider});
    popover.present({ev:ev});
  }
}
