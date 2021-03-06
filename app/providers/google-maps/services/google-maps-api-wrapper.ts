import {Injectable, NgZone} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Observer} from 'rxjs/Observer';

import * as mapTypes from './google-maps-types';
import {MapsAPILoader} from './api-loader/maps-api-loader';

//import {DenethielOverlay} from '../directives/google-overlay';

declare var google:any;

/**
 * Wrapper class that handles the comunication with the Google Maps Javascript 
 * API V3
 */

@Injectable()
export class GoogleMapsAPIWrapper{
    private _map: Promise<mapTypes.GoogleMap>;
    private _mapResolver:(value?:mapTypes.GoogleMap) => void;
    

    constructor(private _loader:MapsAPILoader, private _zone:NgZone){
        this._map = new Promise<mapTypes.GoogleMap>((resolve:() => void) => {this._mapResolver = resolve});
    }

    createMap(el: HTMLElement, mapOptions:mapTypes.MapOptions): Promise<void>{
        return this._loader.load().then(() => {
            const map = new google.maps.Map(el, mapOptions);
            this._mapResolver(<mapTypes.GoogleMap>map);
            return;
        });
    }
    

    setMapOptions(options: mapTypes.MapOptions){
        this._map.then((m:mapTypes.GoogleMap) => {m.setOptions(options);});
    }

    createOverlayView():Promise<mapTypes.OverlayView>{
        return this._map.then(() => { return new google.mapsOverlayView();});
    }

    createInfoBubble(options:any):Promise<mapTypes.InfoBubble>{
        return this._map.then((map:mapTypes.GoogleMap) => {
            var generator = new mapTypes.InfoBubbleGenerator(options, google);
            var infobubble = generator.getInfoBubble();
            console.log("Creando infobubble");
            console.log(infobubble);
            return infobubble;
        })
    }

    createBubble(options:mapTypes.TestOverlay):Promise<mapTypes.OverlayView>{
        return this._map.then((map: mapTypes.GoogleMap) => {
            options.map = map;
            var overlay = new mapTypes.InfoBubbleTS(options, google);
            var view = overlay.getOverlay();
            return view;
        })

    }

    createMarker(options:mapTypes.MarkerOptions = <mapTypes.MarkerOptions>{}):Promise<mapTypes.Marker>{
        return this._map.then((map:mapTypes.GoogleMap) => {
            options.map = map;``
            return new google.maps.Marker(options);
        });
    }

    createInfoWindow(options?: mapTypes.InfoWindowOptions): Promise<mapTypes.InfoWindow>{
        return this._map.then(() => {return new google.maps.InfoWindow(options);});
    }

    createCircle(options: mapTypes.CircleOptions): Promise<mapTypes.Circle>{
        return this._map.then((map: mapTypes.GoogleMap) => {
            options.map = map;
            return new google.maps.Circle(options);
        });
    }

    createLatLng(lat:number, lng:number):Promise<mapTypes.LatLng>{
        return this._map.then(() =>{return new google.maps.LatLng(lat,lng);})
    }

    createLatLngBounds(x:mapTypes.LatLngLiteral,y:mapTypes.LatLngLiteral):Promise<mapTypes.LatLngBounds>{
        return this._map.then(() => {return new google.maps.LatLngBounds(new google.maps.LatLng(x.lat,x.lng), new google.maps.LatLng(y.lat,y.lng));})
    }

    subscribeToMapEvent<E>(eventName:string):Observable<E>{
        return Observable.create((observer:Observer<E>)=>{
            this._map.then((m: mapTypes.GoogleMap)=>{
                m.addListener(eventName,(arg:E) => {this._zone.run(() => observer.next(arg));});
            })
        })
    }

    setCenter(latLng:mapTypes.LatLngLiteral):Promise<void>{
        return this._map.then((map:mapTypes.GoogleMap) => map.setCenter(latLng));
    }

    getZoom(): Promise<number> { return this._map.then((map: mapTypes.GoogleMap) => map.getZoom());}

    getBounds():Promise<mapTypes.LatLngBounds>{
        return this._map.then((map:mapTypes.GoogleMap) => map.getBounds());
    }

    setZoom(zoom:number):Promise<void>{
        return this._map.then((map: mapTypes.GoogleMap) => map.setZoom(zoom));
    }

    getCenter():Promise<mapTypes.LatLng>{
        return this._map.then((map: mapTypes.GoogleMap) => map.getCenter());
    }

    panTo(latLng:mapTypes.LatLng | mapTypes.LatLngLiteral):Promise<void>{
        return this._map.then((map) => map.panTo(latLng));
    }

    fitBounds(latLng: mapTypes.LatLngBounds | mapTypes.LatLngBoundsLiteral):Promise<void>{
        return this._map.then((map) => map.fitBounds(latLng));
    }

    panToBounds(latLng:mapTypes.LatLngBounds | mapTypes.LatLngBoundsLiteral):Promise<void>{
        return this._map.then((map)=> map.panToBounds(latLng));
    }

    getNativeMap(): Promise<mapTypes.GoogleMap>{ return this._map;}

    triggerMapEvent(eventName: string):Promise<void>{
        return this._map.then((m) => google.maps.event.trigger(m,eventName));
    }

    
    
}