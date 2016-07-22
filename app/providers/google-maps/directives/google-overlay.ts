import {Component, AfterContentInit, ContentChild, Directive, EventEmitter, OnChanges, OnDestroy, SimpleChange} from '@angular/core';

import {Subscription} from 'rxjs/Subscription';

import {MouseEvent} from '../map-types';

import * as MapTypes from '../services/google-maps-types';

import {GoogleMapsAPIWrapper} from '../services/google-maps-api-wrapper';

@Component({
    selector:'denethiel-overlay',
    inputs:['image'],
    template:`
    <div class="denethiel-overlay-content">
        <ng-content></ng-content>
    </div>
    `
})
export class DenethielOverlay implements OnDestroy, OnChanges{
    image:string;
    overlay:MapTypes.OverlayView;
    bounds:MapTypes.LatLngBounds;
    constructor(private _wrapper:GoogleMapsAPIWrapper){
        var x:MapTypes.LatLngLiteral = {lat:62.281819,lng:-150.287132}
        var y:MapTypes.LatLngLiteral = {lat:62.400471,lng:-150.005608}

        this._wrapper.createLatLngBounds(x,y).then((bounds:MapTypes.LatLngBounds) =>{
            this.bounds = bounds;
        });
        this._wrapper.createOverlayView().then((overlay:MapTypes.OverlayView)=>{
            this.overlay = overlay;
        });
        this._wrapper.getNativeMap().then((map:MapTypes.GoogleMap)=>{
            this.overlay.setMap(map);
        })
        this.buildDom();
    }
    buildDom();

    ngOnChanges(changes:{[key:string]:SimpleChange}){}

    ngOnDestroy(){}
    
}


