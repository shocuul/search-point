import {Inject, Injectable, Optional, Provider, provide} from '@angular/core';

import {DOCUMENT_GLOBAL, WINDOW_GLOBAL} from '../../utils/browser-globals';

import {MapsAPILoader} from './maps-api-loader';

export enum GoogleMapsScriptProtocol {
    HTTP,
    HTTPS,
    AUTO
}

export interface LazyMapsAPILoaderConfigLiteral{
    apiKey?:string;

    clientId?:string;
    channel?:string;
    apiVersion?:string;
    hostAndPath?:string;
    protocol?:GoogleMapsScriptProtocol;
    libraries?:string[];
    region?:string;
    language?:string;
}

export class LazyMapsAPILoaderConfig implements LazyMapsAPILoaderConfigLiteral{
    apikey:string = null;
    clientId:string = null;
    channel:string = null;
    apiVersion:string = '3';
    hostAndPath:string = 'maps.googleapis.com/maps/api/js';
    protocol:GoogleMapsScriptProtocol = GoogleMapsScriptProtocol.HTTPS;
    libraries: string[] = [];
    region:string = null;
    language:string = null;
}

const DEFAULT_CONFIGURATION = new LazyMapsAPILoaderConfig();

@Injectable()
export class LazyMapsAPILoader extends MapsAPILoader{
    private _scriptLoadingPromise : Promise<void>;
    private _config: LazyMapsAPILoaderConfig;
    private _window: Window;
    private _document : Document;

    constructor(
        @Optional() config: LazyMapsAPILoaderConfig, @Inject(WINDOW_GLOBAL) w: Window, 
        @Inject(DOCUMENT_GLOBAL) d:Document){
            super();
            this._config = config || DEFAULT_CONFIGURATION;
            this._window = w;
            this._document = d;
            
        }
    
    load():Promise<void>{
        if(this._scriptLoadingPromise){
            return this._scriptLoadingPromise;
        }

        const script = this._document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        const callbackName : string = 'denethielGoogleMapsLazyMapsAPILoader';
        script.src = this._getScriptSrc(callbackName);

        this._scriptLoadingPromise = new Promise<void>((resolve: Function, reject: Function) => {
            (<any>this._window)[callbackName] = () => { resolve();};
            script.onerror = (error: Event) => { reject(error); };
        });

        this._document.body.appendChild(script);
        return this._scriptLoadingPromise;
        
    }

    private _getScriptSrc(callbackName: string):string{
        let protocolType: GoogleMapsScriptProtocol = (this._config && this._config.protocol) || DEFAULT_CONFIGURATION.protocol;
        let protocol: string;

        switch(protocolType){
            case GoogleMapsScriptProtocol.AUTO:
            protocol = '';
            break;
            case GoogleMapsScriptProtocol.HTTP:
            protocol = 'http:';
            break;
            case GoogleMapsScriptProtocol.HTTPS:
            protocol = 'https:';
            break;
        }

        const hostAndPath: string = this._config.hostAndPath || DEFAULT_CONFIGURATION.hostAndPath;

        const queryParams: {[key: string] : string | Array<string>} = {
            v: this._config.apiVersion || DEFAULT_CONFIGURATION.apiVersion,
            callback: callbackName,
            key: this._config.apikey,
            client: this._config.clientId,
            channel: this._config.channel,
            libraries: this._config.libraries,
            region: this._config.region,
            language: this._config.language
        };

        const params: string = 
            Object.keys(queryParams)
            .filter((k:string) => queryParams[k] != null)
            .filter((k:string) => {
                return !Array.isArray(queryParams[k]) || (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
            })
            .map((k:string) => {
                let i = queryParams[k];
                if(Array.isArray(i)){
                    return {key:k, value: i.join(',')};
                }
                return {key:k, value: queryParams[k]};
            })
            .map((entry:{key:string, value:string}) => {return `${entry.key}=${entry.value}`;})
            .join('&');
            console.log(`${protocol}//${hostAndPath}?${params}`);
        return `${protocol}//${hostAndPath}?${params}`;
    }
}

export function provideLazyMapsAPILoaderConfig(confLiteral: LazyMapsAPILoaderConfigLiteral): Provider{
    return provide(LazyMapsAPILoaderConfig,{
        useFactory:() => {
            const config = new LazyMapsAPILoaderConfig();
            config.apikey = confLiteral.apiKey || DEFAULT_CONFIGURATION.apikey;
            config.apiVersion = confLiteral.apiVersion || DEFAULT_CONFIGURATION.apiVersion;
            config.channel = confLiteral.channel || DEFAULT_CONFIGURATION.channel;
            config.clientId = confLiteral.clientId || DEFAULT_CONFIGURATION.clientId;
            config.hostAndPath = confLiteral.hostAndPath || DEFAULT_CONFIGURATION.hostAndPath;
            config.language = confLiteral.language || DEFAULT_CONFIGURATION.language;
            config.libraries = confLiteral.libraries || DEFAULT_CONFIGURATION.libraries;
            config.protocol = config.protocol || DEFAULT_CONFIGURATION.protocol;
            config.region = config.region || DEFAULT_CONFIGURATION.region;
            return config;
        }
    })
}