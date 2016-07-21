import {provide} from '@angular/core';
import {LazyMapsAPILoader} from './services/api-loader/lazy-maps-api-loader';
import {MapsAPILoader} from './services/api-loader/maps-api-loader';

import {BROWSER_GLOBALS_PROVIDERS} from './utils/browser-globals';

export * from './directives';
export * from './services';
export * from './map-types';

export {LatLngBounds, LatLng, LatLngLiteral, MapTypeStyle} from './services/google-maps-types';

export const DENETHIEL_MAPS_PROVIDERS:any[] = [
  BROWSER_GLOBALS_PROVIDERS,
  provide(MapsAPILoader,{useClass: LazyMapsAPILoader}),
];