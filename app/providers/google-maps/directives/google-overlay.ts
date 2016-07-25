import {Component, AfterContentInit, ContentChild, Directive, EventEmitter, OnChanges, OnDestroy, SimpleChange} from '@angular/core';

import {Subscription} from 'rxjs/Subscription';

import {MouseEvent} from '../map-types';

import * as MapTypes from '../services/google-maps-types';

import {OverlayViewManager} from '../services/managers/overlay-view-manager';

let OverlayId = 1;

@Component({
    selector:'denethiel-overlay',
    inputs:['image','east','north','south','west'],
    template:`
    <div class="denethiel-overlay-content">
        <ng-content></ng-content>
    </div>
    `
})
export class DenethielOverlay implements OnDestroy, OnChanges, AfterContentInit{
    image:string;
    east:number;
    north:number;
    south:number;
    west:number;

    private _overlayaddedToManager:boolean = false;
    private _id:string;
    constructor(private _overlayViewManager: OverlayViewManager){
        this._id = (OverlayId++).toString();
        console.log(this.image);
    }
    ngAfterContentInit(){
        console.log("OverlayIniciado");
    }

    ngOnChanges(changes: {[key:string]:SimpleChange}){
        
        if(typeof this.east !== 'number' || typeof this.north !== 'number' || typeof this.south !== 'number' || typeof this.west !== 'number' || typeof this.image !== 'string'){
            return;
        }

        if(!this._overlayaddedToManager){
            this._overlayViewManager.addOverlayView(this);
            this._overlayaddedToManager = true;
            return;
        }
    }

    private _addEventListener(){

    }


    ngOnDestroy(){
        this._overlayViewManager.deleteOverlayView(this);
    }

    id(): string{return this._id}

    toString():string { return 'DenethielOverlay-' + this._id.toString(); }
    
}


