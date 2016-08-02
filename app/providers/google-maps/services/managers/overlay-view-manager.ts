import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {MarkerManager} from './marker-manager';

import {DenethielOverlay} from '../../directives/google-overlay';
import {GoogleMapsAPIWrapper} from '../google-maps-api-wrapper';
import {OverlayView, InfoBubble, GoogleMap} from '../google-maps-types';

@Injectable()
export class OverlayViewManager{
    private _overlayViews: Map<DenethielOverlay, Promise<InfoBubble>> = new Map<DenethielOverlay, Promise<InfoBubble>>();

    constructor(private _mapsWrapper: GoogleMapsAPIWrapper, private _zone: NgZone, private _markerManager: MarkerManager){}

    deleteOverlayView(overlayView: DenethielOverlay):Promise<void>{
        const m = this._overlayViews.get(overlayView);
            if (m == null) {
            // overlayView already deleted
            return Promise.resolve();
            }
            return m.then((m: InfoBubble) => {
                return this._zone.run(() => {
                    m.setMap(null);
                    this._overlayViews.delete(overlayView);
            });
        });
    }

    addOverlayView(overlayView: DenethielOverlay){
        //console.log("Estoy agregando un overlayView");
        overlayView.options['content'] = overlayView.content;
        //console.log(bounds);
        const overlayViewPromise = this._mapsWrapper.createInfoBubble(overlayView.options);
        console.log(overlayViewPromise);
        this._overlayViews.set(overlayView, overlayViewPromise);
    }

    getNativeOverlayView(overlayView: DenethielOverlay): Promise<InfoBubble>{
        return this._overlayViews.get(overlayView);
    }

    open(overlayView: DenethielOverlay):Promise<void>{
        return this._overlayViews.get(overlayView).then((v) => {
            if(overlayView.hostMarker != null){
                return this._markerManager.getNativeMarker(overlayView.hostMarker).then((marker) => {
                    return this._mapsWrapper.getNativeMap().then((map) => v.open(map,marker));
                })
            }
            return this._mapsWrapper.getNativeMap().then((map) => v.open(map));
        })
    }

    close(overlayView: DenethielOverlay):Promise<void>{
        return this._overlayViews.get(overlayView).then((v) => v.close());
    }

    /*
    toggle(overlayView: DenethielOverlay):Promise<void>{
        return this._overlayViews.get(overlayView).then((overlay)=>{
            overlay.toggle();
        })
    }
    /** 
    createEventObservable<T>(eventName: string, overlay: DenethielOverlay):Observable<T>{
        return Observable.create((observer: Observer<T>) =>{
            this._overlayViews.get(overlay).then((m:OverlayView)=>{
                m.addListener(eventName,(e:T) => this._zone.run(() => observer.next(e)));
            })
        })
    }
    */

}