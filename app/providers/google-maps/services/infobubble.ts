import {Inject, Injectable, Optional, Provider, provide} from '@angular/core';

import {DOCUMENT_GLOBAL} from '../utils/browser-globals';

import {Observable} from 'rxjs/Observable';

import {Observer} from 'rxjs/Observer';

import * as mapTypes from './google-maps-types';

export interface InfoBubbleOptionsLiteral{
    backgroundColor?:string;
    borderColor?:string;
    borderRadius?:number;
    borderWidth?:number;
    padding?:number;
    arrowPosition?:number;
    disableAutoPan?:boolean;
    disableAnimation?:boolean;
    minWidth?:number;
    shadowStyle?:number;
    arrowSize?:number;
    arrowStyle?:number;
    closeSrc?:string;
}

export class InfoBubbleOptions implements InfoBubbleOptionsLiteral{
    backgroundColor:string = '#fff';
    borderColor:string = '#ccc';
    borderRadius:number = 10;
    borderWidth:number = 1;
    padding:number = 10;
    arrowPosition:number = 50;
    disableAutoPan:boolean = false;
    disableAnimation:boolean = false;
    midWidth:number = 50;
    shadowStyle:number = 1;
    arrowSize:number = 15;
    arrowStyle:number = 0;
    closeSrc:string = 'https://maps.gstatic.com/intl/en_us/mapfiles/iw_close.gif';
}

const DEFAULT_CONFIGURATION = new InfoBubbleOptions();

@Injectable()
export class InfoBubble {
    private _options:InfoBubbleOptions;
    private _document:Document;
    constructor(
        @Optional() options:InfoBubbleOptions,
        @Inject(DOCUMENT_GLOBAL) d:Document){
            this._options = options || DEFAULT_CONFIGURATION;
            this._document = d;
        }
}