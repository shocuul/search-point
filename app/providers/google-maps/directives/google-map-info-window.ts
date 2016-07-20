import {Component, ElementRef, EventEmitter, OnChanges, OnDestroy, SimpleChange} from '@angular/core';

import {} from '../services/managers/info-window-manager';

import {DenethielGoogleMapMarker} from './google-map-marker';

let infoWindowId = 0;

@Component({
    selector:'denethiel-google-map-info-window',
    inputs:['latitude','longitude','disableAutoPan','isOpen'],
    outputs:['infoWindowClose'],
    template:`
    <div class="denethiel-google-map-info-window-content">
    <ng-content></ng-content>
    </div>
    `
})
export class DenethielGoogleMapInfoWindow implements OnDestroy, OnChanges{
    latitude: number;
    longitude:number;
    disableAutoPan:boolean;
    zIndex:number;
    maxWidth:number;
    hostMarker: DenethielGoogleMapMarker;
    content: Node;
    isOpen: boolean = false;
    infoWindowClose: EventEmitter<void> = new EventEmitter<void>();

    constructor(){}

    ngAfterContentInit(){

    }

    ngOnChanges(changes:{[key:string]:SimpleChange}){
        
    }

}