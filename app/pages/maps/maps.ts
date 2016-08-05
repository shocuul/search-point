import {Component, OnInit} from '@angular/core';
import {NavController, ModalController, LoadingController, PopoverController} from 'ionic-angular';
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
  lng: number;
  bubbleOptions: any = {
    maxWidth: 300
  } 
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
  
  constructor(private navController: NavController, 
  private appProvider: AppProvider, 
  public modalCtrl: ModalController, 
  public loadingCtrl: LoadingController, 
  public popoverCtrl: PopoverController) { }

  ngOnInit(){
     this.loadMap();
  }



  loadMap(){
    
    let loading = this.loadingCtrl.create({
      content: 'Cargando Mapa...'
    })
    loading.present();
    Geolocation.getCurrentPosition().then((resp)=>{
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.appProvider.getItems(resp.coords.latitude,resp.coords.longitude);
      loading.dismiss();
    })
  } 

  showFilterPopOver(ev){
    let popover = this.popoverCtrl.create(FilterPopover,{provider:this.appProvider});

    popover.present({ev:ev});
  }

  showModal(){
    //this.overlay.toggle();
    let modal = this.modalCtrl.create(SearchModal);
    modal.present();
    
  }
}
