import {Component, OnInit} from '@angular/core';
import {NavController, Modal, Loading, Popover} from 'ionic-angular';
import {Category, Item} from '../../providers/wp-api/data-clases'
import {AppProvider} from '../../providers/wp-api/app-provider';
import {Geolocation} from 'ionic-native';
import {SearchModal} from './search';
import {FilterPopover} from './filter';
//import { GOOGLE_MAPS_DIRECTIVES, GOOGLE_MAPS_PROVIDERS } from 'angular2-google-maps/core';
import {DENETHIEL_MAPS_DIRECTIVES, DENETHIEL_MAPS_PROVIDERS, DenethielOverlay} from '../../providers/google-maps'
import {MapTypeStyle} from '../../providers/google-maps'

@Component({
  templateUrl: 'build/pages/maps/maps.html',
  directives:[DENETHIEL_MAPS_DIRECTIVES],
  providers:[DENETHIEL_MAPS_PROVIDERS, AppProvider]
})
export class MapsPage implements OnInit {
  lat: number;
  latitude:number = 62.323907;
  longitude:number = -150.109291;
  south:number = 62.281819;
  west:number = -150.287132;
  north:number = 62.400471;
  east:number = -150.005608;
  image:string = "https://developers.google.com/maps/documentation/javascript/examples/full/images/talkeetna.png";
  lng: number;
  overlay:DenethielOverlay;
  styleArray:MapTypeStyle[] = [
    {
      featureType: 'all',
      elementType: 'all',
      stylers: [
        {invert_lightness:true},
       { saturation: 20 },
       { lightness: 50},
       { gamma: 0.4},
       { hue: "#00ffee"}
      ]
    },{
      featureType: "all",
      elementType: "geometry",
      stylers: [
        { visibility: "simplified" }
      ]
    },{
      featureType: "all",
      elementType: "labels",
      stylers: [
        { visibility: "on" }
      ]
    },{
      featureType: "administrative",
      elementType: "all",
      stylers:[{
        color: "#ffffff"
      },{
        visibility: "simplified"
      }]
    },{
      featureType: "administrative.land_parcel",
      elementType: "geometry.stroke",
      stylers:[
        {
          visibility: "simplified"
        }
      ]
    },{
      featureType: "landscape",
      elementType: "all",
      stylers:[
        {
          color:"#405769"
        }
      ]
    },{
      featureType: "water",
      elementType: "geometry.fill",
      stylers:[
        {
          color: "#232f3a"
        }
      ]
    }
  ];
  
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
    //this.overlay.toggle();
    
    let modal = Modal.create(SearchModal)
    this.navController.present(modal);
    
  }
}
