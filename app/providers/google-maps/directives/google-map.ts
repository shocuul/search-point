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
    draggingCursor: string;
    keyboardShortcuts: boolean = true;
    zoomControl: boolean = true;
    styles: MapTypeStyle[] = [];

    usePanning: boolean = false;
    streetViewControl: boolean = true;
    fitBounds: LatLngBoundsLiteral | LatLngBounds = null;
    scaleControl: boolean = false;

    private static _mapOptionsAttributes: string[] = [
        'disableDoubleClickZoom', 'scrollwheel', 'draggableCursor', 'draggingCursor',
        'keyboardShortcuts', 'zoomControl', 'styles', 'streetViewControl', 'zoom'
    ];

    private _observableSubscriptions: Subscription[] = [];

    mapClick : EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    mapRightClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    mapDoubleClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    centerChange: EventEmitter<LatLngLiteral> = new EventEmitter<LatLngLiteral>();

    boundsChange: EventEmitter<LatLngBounds> = new EventEmitter<LatLngBounds>();

    idle: EventEmitter<void> = new EventEmitter<void>();

    constructor(private _elem:ElementRef, private _mapsWrapper:GoogleMapsAPIWrapper){}

    ngOnInit(){
        const container = this._elem.nativeElement.querySelector('.denethiel-google-map-container-inner');
        this._initMapInstance(container);
    }

    private _initMapInstance(el: HTMLElement){
        this._mapsWrapper.createMap(el,{
            center: {lat: this.latitude || 0, lng: this.longitude || 0},
            zoom: this.zoom,
            disableDefaultUI: this.disableDefaultUI,
            backgroundColor: this.backgroundColor,
            draggableCursor: this.draggableCursor,
            draggingCursor: this.draggingCursor,
            keyboardShortcuts: this.keyboardShortcuts,
            zoomControl: this.zoomControl,
            styles: this.styles,
            streetViewControl: this.streetViewControl,
            scaleControl: this.scaleControl
        });
        this._handleMapCenterChange();
        this._handleMapZoomChange();
        this._handleMapMouseEvents();
        this._handleBoundsChange();
        this._handleIdleEvent();
    }

    ngOnDestroy(){
        this._observableSubscriptions.forEach((s) => s.unsubscribe());
    }

    ngOnChanges(changes:{[propName:string]: SimpleChange}){
        this._updateMapOptionsChanges(changes);
        this._updatePosition(changes);
    }

    private _updateMapOptionsChanges(changes: {[propName: string]:SimpleChange}){
        let options: {[propName:string]:any} = {};
        let optionsKey = Object.keys(changes).filter(k => DenethielGoogleMap._mapOptionsAttributes.indexOf(k) !== -1);
        optionsKey.forEach((k) => {options[k] = changes[k].currentValue;});
        this._mapsWrapper.setMapOptions(options);
    }

    triggerResize(): Promise<void>{
        return new Promise<void>((resolve) =>{
            setTimeout(() => { return this._mapsWrapper.triggerMapEvent('resize').then(() => resolve());});
        })
    }

    private _updatePosition(changes: {[propName: string]: SimpleChange}){
        if(changes['latitude'] == null && changes['longitude'] == null && changes['fitBounds'] == null){
            return;
        }

        if(changes['fitBounds'] && this.fitBounds != null){
            this._fitBounds();
            return;
        }

        if(typeof this.latitude !== 'number' || typeof this.longitude !== 'number'){
            return;
        }

        let newCenter = {
            lat: this.latitude,
            lng: this.longitude,
        };
        if(this.usePanning){
            this._mapsWrapper.panTo(newCenter);
        }else{
            this._mapsWrapper.setCenter(newCenter);
        }
    }

    private _fitBounds(){
        if(this.usePanning){
            this._mapsWrapper.panToBounds(this.fitBounds);
            return;
        }
        this._mapsWrapper.fitBounds(this.fitBounds);
    }

    private _handleMapCenterChange(){
        const s = this._mapsWrapper.subscribeToMapEvent<void>('center_changed').subscribe(() => {
            this._mapsWrapper.getCenter().then((center: LatLng) => {
                this.latitude = center.lat();
                this.longitude = center.lng();
                this.centerChange.emit(<LatLngLiteral>{lat: this.latitude, lng: this.longitude});
            });
        });
        this._observableSubscriptions.push(s);
    }

    private _handleBoundsChange(){
        const s = this._mapsWrapper.subscribeToMapEvent<void>('bounds_change').subscribe(() => {
            this._mapsWrapper.getBounds().then((bounds: LatLngBounds) =>{
                this.boundsChange.emit(bounds);
            });
        });
        this._observableSubscriptions.push(s);
    }

    private _handleMapZoomChange(){
        const s = this._mapsWrapper.subscribeToMapEvent<void>('zoom_changed').subscribe(() => {
            this._mapsWrapper.getZoom().then((z:number) => this.zoom = z);
        });
        this._observableSubscriptions.push(s);
    }

    private _handleIdleEvent(){
        const s = this._mapsWrapper.subscribeToMapEvent<void>('idle').subscribe(() => {
            this.idle.emit(void 0);
        });
        this._observableSubscriptions.push(s);
    }

    private _handleMapMouseEvents(){
        interface Emitter{
            emit(value:any):void;
        }

        type Event = {name:string, emitter:Emitter};

        const events : Event[] = [
            {name:'click', emitter: this.mapClick},
            {name:'rightclick',emitter: this.mapRightClick},
        ];

        events.forEach((e: Event) =>{
            const s = this._mapsWrapper.subscribeToMapEvent<{latLng: LatLng}>(e.name).subscribe((event: {latLng: LatLng}) => {
                const value = <MouseEvent>{coords: {lat: event.latLng.lat(), lng: event.latLng.lng()}};
                e.emitter.emit(value);
            });
            this._observableSubscriptions.push(s);
        });
    }
    
}