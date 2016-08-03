import {Component, AfterContentInit, ElementRef, ContentChild,  EventEmitter, OnChanges, OnDestroy, SimpleChange} from '@angular/core';






import {OverlayViewManager} from '../services/managers/overlay-view-manager';

import {DenethielGoogleMapMarker} from './google-map-marker';

let OverlayId = 1;

@Component({
    selector:'denethiel-overlay',
    inputs:['options'],
    outputs:['overlayClose'],
    template:`
    
    <div class='denethiel-overlay-content'>
        <ng-content></ng-content>
    </div>
    `
})
export class DenethielOverlay implements OnDestroy, OnChanges, AfterContentInit{
    options:any;
    content: Node;
    isOpen: boolean = false;

    hostMarker: DenethielGoogleMapMarker;
    overlayClose: EventEmitter<void> = new EventEmitter<void>();

    private _overlayaddedToManager:boolean = false;
    private _id:string;
    constructor(private _overlayViewManager: OverlayViewManager, private _el: ElementRef){
        this._id = (OverlayId++).toString();
    }

    ngOnInit(){
        this.content = this._el.nativeElement.querySelector('.denethiel-overlay-content');
        this._overlayViewManager.addOverlayView(this);
        this._overlayaddedToManager = true;
        this._updateOpenState();

    }

    private _updateOpenState(){
        this.isOpen? this._overlayViewManager.open(this) : this._overlayViewManager.close(this);
    }
    ngAfterContentInit(){
        
    }

    ngOnChanges(changes: {[key:string]:SimpleChange}){
        
        //if(typeof this.east !== 'number' || typeof this.north !== 'number' || typeof this.south !== 'number' || typeof this.west !== 'number' || typeof this.image !== 'string'){
          //  return;
        //}
        /*
        if(!this._overlayaddedToManager){
            this._overlayViewManager.addOverlayView(this);
            this._overlayaddedToManager = true;
            return;
        }*/
    }

    private _addEventListener(){

    }

    open(): Promise<void> { return this._overlayViewManager.open(this);}

    close() : Promise<void> {
        return this._overlayViewManager.close(this).then(() => {this.overlayClose.emit(void 0);})
    }

    ngOnDestroy(){
        this._overlayViewManager.deleteOverlayView(this);
    }

    id(): string{return this._id}

    toString():string { return 'DenethielOverlay-' + this._id.toString(); }
    /*
    toggle():Promise<void>{
        return this._overlayViewManager.toggle(this).then(() => {this.overlayToggle.emit(void 0);})
    }
    */
}


