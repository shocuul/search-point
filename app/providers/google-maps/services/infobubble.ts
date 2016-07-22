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
    private _bubble:HTMLElement
    private _tabsContainer:HTMLElement;
    private _tabs:any[] = [];
    private _activeTab = null;
    private _baseZIndex = 100;
    private _isOpen = false;

    private _close:HTMLElement;
    constructor(
        @Optional() options:InfoBubbleOptions,
        @Inject(DOCUMENT_GLOBAL) d:Document){
            this._options = options || DEFAULT_CONFIGURATION;
            this._document = d;
        }

    private _buildDom(){
        var bubble = this._bubble = this._document.createElement('div');
        bubble.style['position'] = 'absolute';
        bubble.style['zIndex'] = this._baseZIndex.toString();

        var tabsContainer = this._tabsContainer = this._document.createElement('div');
        tabsContainer.style.position = 'relative';

        var close = this._close = this._document.createElement('img');
        close.style.position = 'absolute';
        close.style.border = '0';
        close.style.zIndex = (this._baseZIndex + 1).toString();
        close.style.cursor = 'pointer';
        close.src = this._options.closeSrc;

        //* CLOSE EVENT LISTENER




    }
}