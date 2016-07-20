import {AfterContentInit, ContentChild, Directive, EventEmitter, OnChanges, OnDestroy, SimpleChange} from '@angular/core'

import {Subscription} from 'rxjs/Subscription';

import {MouseEvent} from '../map-types';
import * as mapTypes from '../services/google-maps-types';
import {MarkerManager} from '../services/managers/marker-manager';

import {DenethielGoogleMapInfoWindow} from './google-map-info-window';

let markerId = 0;

@Directive({
    selector: 'denethiel-google-map-marker',
    inputs:[
        'latitude','longitude','title','label','draggable: markerDraggable','iconUrl',
        'openInfoWindow','fitBounds'
    ],
    outputs:['markerClick','dragEnd']
})
export class DenethielGoogleMapMarker implements OnDestroy, OnChanges, AfterContentInit{
    latitude:number;
    longitude:number;
    title:string;
    label:string;
    draggable: boolean = false;
    iconUrl : string;
    openInfoWindow: boolean = true;
    markerClick : EventEmitter<void> = new EventEmitter<void>();
    dragEnd: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @ContentChild(DenethielGoogleMapInfoWindow) private _infoWindow : DenethielGoogleMapInfoWindow;

    private _markerAddToManger : boolean = false;
    private _id : string;
    private _observableSubscriptions: Subscription[] = [];

    constructor(private _markerManager: MarkerManager) { this._id = (markerId++).toString();}

    ngAfterContentInit(){

    }

    ngOnChanges(changes:{[key:string]:SimpleChange}){
        if(typeof this.latitude !== 'number' || typeof this.longitude !== 'number'){
            return;
        }

        if(!this._markerAddToManger){
            this._markerManager.addMarker(this);
            this._markerAddToManger = true;
            this._addEventListeners();
            return;
        }
        if(changes['latitude'] || changes['longitude']){
            this._markerManager.updateMarkerPosition(this);
        }

        if(changes['title']){
            this._markerManager.updateTitle(this);
        }
        if(changes['label']){
            this._markerManager.updateLabel(this);
        }
        if(changes['draggable']){
            this._markerManager.updateDraggable(this);
        }
        if(changes['iconUrl']){
            this._markerManager.updateIcon(this);
        }
    }

    private _addEventListeners(){
        const cs = this._markerManager.createEventObservable('click',this).subscribe(() => {
            if(this.openInfoWindow && this._infoWindow != null){
                this._infoWindow.open();
            }
            this.markerClick.emit(null);
        });
        this._observableSubscriptions.push(cs);
        const ds = this._markerManager.createEventObservable<mapTypes.MouseEvent>('dragend', this)
                   .subscribe((e: mapTypes.MouseEvent) => {
                     this.dragEnd.emit({coords: {lat: e.latLng.lat(), lng: e.latLng.lng()}});
                   });
        this._observableSubscriptions.push(ds);
    }

    id():string{ return this._id; }

    toString(): string { return 'SebmGoogleMapMarker-' + this._id.toString(); }

    ngOnDestroy(){
        this._markerManager.deleteMarker(this);

        this._observableSubscriptions.forEach((s) => s.unsubscribe());
    }

    }
