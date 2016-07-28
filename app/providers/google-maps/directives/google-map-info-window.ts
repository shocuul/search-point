import {Component, ElementRef, EventEmitter, OnChanges, OnDestroy, SimpleChange} from '@angular/core';

import {InfoWindowManager} from '../services/managers/info-window-manager';

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

    private static _infoWindowOptionsInputs: string[] = ['disableAutoPan','maxWidth'];
    private _infoWindowAddedToManager: boolean = false;
    private _id: string = (infoWindowId++).toString();



    constructor(private _infoWindowManager: InfoWindowManager, private _el: ElementRef){}

    ngOnInit(){
        this.content = this._el.nativeElement.querySelector('.denethiel-google-map-info-window-content');
        this._infoWindowManager.addInfoWindow(this);
        this._infoWindowAddedToManager = true;
        this._updateOpenState();
    }

    ngOnChanges(changes:{[key:string]:SimpleChange}){
        if(!this._infoWindowAddedToManager){
            return;
        }
        if((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' && typeof this.longitude === 'number'){
            this._infoWindowManager.setPosition(this);
        }
        if(changes['zIndex']){
            this._infoWindowManager.setZIndex(this);
        }
        if(changes['isOpen']){
            this._updateOpenState();
        }
        this._setInfoWindowOptions(changes);
    }

    private _updateOpenState(){
        this.isOpen ? this._infoWindowManager.open(this) : this._infoWindowManager.close(this);
    }

    private _setInfoWindowOptions(changes:{[key:string]:SimpleChange}){
        let options: {[propName: string]:any} = {};
        let optionsKeys = Object.keys(changes).filter(
            k => DenethielGoogleMapInfoWindow._infoWindowOptionsInputs.indexOf(k) !== -1);
            optionsKeys.forEach((k) => {options[k] = changes[k].currentValue;});
            this._infoWindowManager.setOptions(this, options);
    }

    open(): Promise<void> { return this._infoWindowManager.open(this);}

    close():Promise<void>{
        return this._infoWindowManager.close(this).then(()=>{this.infoWindowClose.emit(void 0);});
    }
    id():string{return this._id;}

    toString():string{return 'DenethielGoogleMapInfoWindow-'+ this._id.toString();}

    ngOnDestroy(){this._infoWindowManager.deleteInfoWindow(this);}

}