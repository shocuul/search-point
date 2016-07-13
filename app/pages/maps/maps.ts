import {Component, OnInit} from '@angular/core';
import {NavController, Modal, Loading, Popover} from 'ionic-angular';
import {Category, Item} from '../../providers/wp-api/data-clases'
import {AppProvider} from '../../providers/wp-api/app-provider';
import {Geolocation} from 'ionic-native';
import {SearchModal} from './search';
import {FilterPopover} from './filter';
import { GOOGLE_MAPS_DIRECTIVES, GOOGLE_MAPS_PROVIDERS } from 'angular2-google-maps/core';

@Component({
  templateUrl: 'build/pages/maps/maps.html',
  directives:[GOOGLE_MAPS_DIRECTIVES],
  providers:[GOOGLE_MAPS_PROVIDERS, AppProvider]
})
export class MapsPage implements OnInit {
  lat: number;
  lng: number;
  constructor(private navController: NavController, private appProvider: AppProvider) { }

  ngOnInit(){
     this.loadMap();
  }

  loadMap(){
    let loading = Loading.create({
      content:'Cargando Mapa...'
    });
    this.navController.present(loading);
    Geolocation.getCurrentPosition().then((resp)=>{
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.appProvider.getItems(resp.coords.latitude,resp.coords.longitude);
      loading.dismiss();
    })
  }

  showFilterPopOver(ev){
    let popover = Popover.create(FilterPopover,{provider:this.appProvider});
    this.navController.present(popover,{
      ev:ev
    });
  }

  showModal(){
    let modal = Modal.create(SearchModal)
    this.navController.present(modal);
  }
}
