import {MapsAPILoader} from './maps-api-loader';

export class NoOpMapsAPILoader implements MapsAPILoader{
    load(): Promise<void>{
        if(!(<any>window).google || !(<any>window).google.maps){
            throw new Error(
                'Google Maps API not loaded on page. Make sure window.google.maps is available!'
            );
        }
        return Promise.resolve();
    };
}