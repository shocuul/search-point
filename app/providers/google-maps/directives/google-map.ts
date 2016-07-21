import {Component, ElementRef, EventEmitter, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {MouseEvent} from '../map-types';

import {GoogleMapsAPIWrapper} from '../services/google-maps-api-wrapper';
import {LatLng, LatLngLiteral} from '../services/google-maps-types';
import {LatLngBounds, LatLngBoundsLiteral, MapTypeStyle} from '../services/google-maps-types';
import {InfoWindowManager} from '../services/managers/info-window-manager';
import {MarkerManager} from '../services/managers/marker-manager';

@Component({
    selector:'denethiel-google-map',
    providers:[GoogleMapsAPIWrapper, MarkerManager, InfoWindowManager],
    inputs:[
        'longitude','latitude','zoom','disableDoubleClickZoom', 'disableDefaultUI', 'scrollwheel',
    'backgroundColor', 'draggableCursor', 'draggingCursor', 'keyboardShortcuts', 'zoomControl',
    'styles', 'usePanning', 'streetViewControl', 'fitBounds', 'scaleControl'
    ],
    outputs:['mapClick','mapRightClick','mapDoubleClick','centerChange','idle','boundsChange'],
    host:{'[class.denethiel-google-map-container]':'true'},
    styles:[`
    .denethiel-google-map-container-inner{
        width: inherit;
        height: inherit;
    }
    .denethiel-google-map-content{
        display:none;
    }
    `],
    template:`
    <div class='denethiel-google-map-container-inner'></div>
    <div class='denethiel-google-map-content'>
        <ng-content></ng-content>
    </div>
    `
})
export class DenethielGoogleMap implements OnChanges, OnInit{
    longitude: number = 0;
    latitude: number = 0;
    zoom: number = 8;
    disableDoubleClickZoom: boolean = false;
    disableDefaultUI: boolean = false;
    scrollwheel: boolean = true;
    backgroundColor: string;
    draggableCursor: string;
    
}