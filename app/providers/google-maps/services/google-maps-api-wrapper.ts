import {Injectable, NgZone} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Observer} from 'rxjs/Observer';

import * as mapTypes from './google-maps-types';
import {MapsAPILoader} from './api-loader/maps-api-loader';

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

    createMarker(options:mapTypes.MarkerOptions = <mapTypes.MarkerOptions>{}):Promise<mapTypes.Marker>{
        return this._map.then((map:mapTypes.GoogleMap) => {
            options.map = map;
            return new google.maps.Marker(options);
        });
    }

    
}