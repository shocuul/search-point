import {Injectable, NgZone} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {GoogleMapsAPIWrapper} from './../google-maps-api-wrapper';

import {Marker} from './../google-maps-types';

import {DenethielGoogleMapMarker} from '../../directives/google-map-marker';

@Injectable()
export class MarkerManager{
    private _markers : Map<DenethielGoogleMapMarker, Promise<Marker>> = new Map<DenethielGoogleMapMarker, Promise<Marker>>();
    constructor(private _mapsWrapper: GoogleMapsAPIWrapper, private _zone: NgZone){}

    deleteMarker(marker: DenethielGoogleMapMarker): Promise<void>{
        const m = this._markers.get(marker);
        if(m == null){
            return Promise.resolve();
        }
        return m.then((m: Marker) =>{
            return this._zone.run(() =>{
                m.setMap(null);
                this._markers.delete(marker);
            });
        });
    }

    updateMarkerPosition(marker: DenethielGoogleMapMarker): Promise<void> {
        return this._markers.get(marker).then(
            (m: Marker) => m.setPosition({lat: marker.latitude, lng: marker.longitude}));
    }

    updateTitle(marker: DenethielGoogleMapMarker):Promise<void>{
        return this._markers.get(marker).then((m:Marker) => m.setTitle(marker.title));
    }

    updateLabel(marker:DenethielGoogleMapMarker):Promise<void>{
        return this._markers.get(marker).then((m:Marker) => {m.setLabel(marker.label);});
    }

    updateDraggable(marker:DenethielGoogleMapMarker):Promise<void>{
        return this._markers.get(marker).then((m:Marker) => m.setDraggable(marker.draggable));
    }

    updateIcon(marker: DenethielGoogleMapMarker):Promise<void>{
        return this._markers.get(marker).then((m:Marker) => m.setIcon(marker.iconUrl));
    }

    addMarker(marker: DenethielGoogleMapMarker){
        const markerPromise = this._mapsWrapper.createMarker({
            position: {lat: marker.latitude, lng: marker.longitude},
            label: marker.label,
            draggable: marker.draggable,
            icon: marker.iconUrl
        });
        //console.log(markerPromise);
        this._markers.set(marker, markerPromise);
    }

    getNativeMarker(marker: DenethielGoogleMapMarker):Promise<Marker>{
        return this._markers.get(marker);
    }

    createEventObservable<T>(eventName: string, marker: DenethielGoogleMapMarker):Observable<T>{
        return Observable.create((observer: Observer<T>) =>{
            this._markers.get(marker).then((m:Marker)=>{
                m.addListener(eventName,(e:T) => this._zone.run(() => observer.next(e)));
            })
        })
    }
            

    
}
