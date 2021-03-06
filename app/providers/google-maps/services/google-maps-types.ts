export var google:any;

export interface GoogleMap extends MVCObject {

    constructor(el: HTMLElement, opts?:MapOptions): void;
    panTo(latLng:LatLng| LatLngLiteral): void;
    setZoom(zoom: number):void;
    getCenter():LatLng;
    setCenter(latLng: LatLng|LatLngLiteral):void;
    getBounds():LatLngBounds;
    getZoom():number;
    setOptions(options: MapOptions):void;
    panToBounds(latLngBounds:LatLngBounds|LatLngBoundsLiteral):void;
    fitBounds(bounds:LatLngBounds|LatLngBoundsLiteral):void;
}
// InfoBox.js Implementation
export interface Point{
  constructor(x:number, y:number):void;
  equals(other: Point):boolean;
  toString():string;
  x():number;
  y():number;

}

export interface MapCanvasProjection extends MVCObject{
  fromContainerPixelToLatLng(pixel: Point, nowrap?:boolean):LatLng;
  fromDivPixelToLatLng(pixel:Point, nowrap?:boolean):LatLng;
  fromLatLngToContainerPixel(latLng:LatLng):Point;
  fromLatLngToDivPixel(latLng:LatLng):Point;
  getWorldWidth():number;
}

export interface MapPanes{
  floatPane:HTMLElement;
  mapPane: HTMLElement;
  markerLayer: HTMLElement;
  overlayLayer:HTMLElement;
  overlayMouseTarger:Element;
}

export interface OverlayView extends MVCObject{
  constructor():void;
  draw():void;
  getMap():GoogleMap;
  getPanes():MapPanes;
  getProjection():MapCanvasProjection;
  onAdd():void;
  onRemove():void;
  setMap(map:GoogleMap):void;
  toggle():void;
  show():void;
  hide():void;
  toggleDOM():void;
}

/////////////////////////////////////////////////
export interface LatLng {
  constructor(lat: number, lng: number): void;
  lat(): number;
  lng(): number;
}

export interface Marker extends MVCObject {
  constructor(options?: MarkerOptions): void;
  setMap(map: GoogleMap): void;
  setPosition(latLng: LatLng|LatLngLiteral): void;
  setTitle(title: string): void;
  setLabel(label: string|MarkerLabel): void;
  setDraggable(draggable: boolean): void;
  setIcon(icon: string): void;
  getLabel(): MarkerLabel;
}

export interface MarkerOptions {
  position: LatLng|LatLngLiteral;
  title?: string;
  map?: GoogleMap;
  label?: string|MarkerLabel;
  draggable?: boolean;
  icon?: string;
}

export interface MarkerLabel {
  color: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  text: string;
}


export interface Circle extends MVCObject {
  getBounds(): LatLngBounds;
  getCenter(): LatLng;
  getDraggable(): boolean;
  getEditable(): boolean;
  getMap(): GoogleMap;
  getRadius(): number;
  getVisible(): boolean;
  setCenter(center: LatLng|LatLngLiteral): void;
  setDraggable(draggable: boolean): void;
  setEditable(editable: boolean): void;
  setMap(map: GoogleMap): void;
  setOptions(options: CircleOptions): void;
  setRadius(radius: number): void;
  setVisible(visible: boolean): void;
}

export interface CircleOptions {
  center?: LatLng|LatLngLiteral;
  clickable?: boolean;
  draggable?: boolean;
  editable?: boolean;
  fillColor?: string;
  fillOpacity?: number;
  map?: GoogleMap;
  radius?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokePosition?: 'CENTER'|'INSIDE'|'OUTSIDE';
  strokeWeight?: number;
  visible?: boolean;
  zIndex?: number;
}

export interface LatLngBounds {
  contains(latLng: LatLng): boolean;
  equals(other: LatLngBounds|LatLngBoundsLiteral): boolean;
  extend(point: LatLng): void;
  getCenter(): LatLng;
  getNorthEast(): LatLng;
  getSouthWest(): LatLng;
  intersects(other: LatLngBounds|LatLngBoundsLiteral): boolean;
  isEmpty(): boolean;
  toJSON(): LatLngBoundsLiteral;
  toSpan(): LatLng;
  toString(): string;
  toUrlValue(precision?: number): string;
  union(other: LatLngBounds|LatLngBoundsLiteral): LatLngBounds;

}
export interface LatLngBoundsLiteral {
  east: number;
  north: number;
  south: number;
  west: number;
}

export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface MouseEvent { latLng: LatLng;}

export interface MapOptions{
    center?:LatLng|LatLngLiteral;
    zoom?:number;
    disableDoubleClickZoom?:boolean;
    disableDefaultUI?:boolean;
    backgroundColor?:string;
    draggableCursor?: string;
    draggingCursor?: string;
    keyboardShortcuts?: boolean;
    zoomControl?: boolean;
    styles?: MapTypeStyle[];
    streetViewControl?: boolean;
    scaleControl?: boolean;
}

export interface MapTypeStyle {
  featureType: 'administrative'|'administrative.country'|'administrative.land_parcel'|
      'administrative.locality'|'administrative.neighborhood'|'administrative.province'|'all'|
      'landscape'|'landscape.man_made'|'landscape.natural'|'landscape.natural.landcover'|
      'landscape.natural.terrain'|'poi'|'poi.attraction'|'poi.business'|'poi.government'|
      'poi.medical'|'poi.park'|'poi.place_of_worship'|'poi.school'|'poi.sports_complex'|'road'|
      'road.arterial'|'road.highway'|'road.highway.controlled_access'|'road.local'|'transit'|
      'transit.line'|'transit.station'|'transit.station.airport'|'transit.station.bus'|
      'transit.station.rail'|'water';
  elementType?: 'all'|'geometry'|'geometry.fill'|'geometry.stroke'|'labels'|'labels.icon'|
      'labels.text'|'labels.text.fill'|'labels.text.stroke';
  stylers: MapTypeStyler[];
}

export interface MapTypeStyler {
  color?: string;
  gamma?: number;
  hue?: string;
  invert_lightness?: boolean;
  lightness?: number;
  saturation?: number;
  visibility?: string;
  weight?: number;
}

export interface InfoWindow {
  constructor(opts?: InfoWindowOptions): void;
  close(): void;
  getContent(): string|Node;
  getPosition(): LatLng;
  getZIndex(): number;
  open(map?: GoogleMap, anchor?: MVCObject): void;
  setContent(content: string|Node): void;
  setOptions(options: InfoWindowOptions): void;
  setPosition(position: LatLng|LatLngLiteral): void;
  setZIndex(zIndex: number): void;
}

export interface MVCObject { 
  addListener(eventName:string, handler:Function): MapsEventListener;
  bindTo(key:string,target:MVCObject,targetKey?:string, noNotify?:boolean):void;
  changed(key:string):void;
  get(key:string):any;

}

export interface MapsEventListener{remove():void;}

export interface Size {
  height: number;
  width: number;
  constructor(width: number, height: number, widthUnit?: string, heightUnit?: string): void;
  equals(other: Size): boolean;
  toString(): string;
}

export interface InfoWindowOptions {
  content?: string|Node;
  disableAutoPan?: boolean;
  maxWidth?: number;
  pixelOffset?: Size;
  position?: LatLng|LatLngLiteral;
  zIndex?: number;
}


/** 
export class InfoBubbleConstructor{
  infobubble:any;
  constructor(options:any,google:any){
    this.infobubble = InfoBubble(options,google);
  }
  getBubble():any{
    return this.infobubble;
  }

}

*/

class Utils {
  public static CopyProperties(source:OverlayView, target:InfoBubbleTS):void{
    for (var prop in source){
      if(target[prop] !== undefined){
        target[prop] = source[prop];
      }else{
        console.error('Cannont set undefined property: ' + prop);
      }
    }
  }
}

export interface TestOverlay{
  bounds:LatLngBoundsLiteral;
  image:string;
  map:GoogleMap;
}


function CardOverlay(options:any, google:any){
  this.extends(CardOverlay, google.maps.OverlayView);
  //this.latLng = options.marker.getPosition();
  this.baseZIndex_ = 100;
  

  this.isOpen_ = false;
  //this._buildDom(google);
  this.setValues(options);
  this.buildDom_(google);
  //console.log(this.get('content'));

}

CardOverlay.prototype.buildDom_ = function(google){
  console.log("BuildDom");
  var buuble = this.bubble_ = document.createElement('div');
  buuble.style['position'] = 'absolute';
  buuble.style['zIndex'] = this.baseZIndex_;

  var close = this.close_ = document.createElement('img');
  close.style['position'] = 'absolute';
  close.style['border'] = '0';
  close.style['zIndex'] = this._baseZIndex + 1;
  close.style['cursor'] = 'pointer';
  close.style['width'] = '10px';
  close.style['height'] = '10px';
  close.src = 'https://maps.gstatic.com/intl/en_us/mapfiles/iw_close.gif';


  var that = this;
  google.maps.event.addDomListener(close, 'click',function(){
    console.log("cerrar info");
    that.close();
    google.maps.event.trigger(that,'closeclick');

  });

  var contentContainer = this.contentContainer_ = document.createElement('div');
  contentContainer.style['overflowX'] = 'auto';
  contentContainer.style['overflowY'] = 'auto';
  contentContainer.style['cursor'] = 'default';
  contentContainer.style['clear'] = 'both';
  contentContainer.style['position'] = 'relative';

  this.content_ = document.createElement('div');
  contentContainer.appendChild(this.content_);

  console.log(contentContainer);

  buuble.style['display'] = 'none';

  buuble.appendChild(close);
  buuble.appendChild(contentContainer);
  

  

}

CardOverlay.prototype.px = function(num){
  if(num){
    return num + 'px';
  }
  return num;
}
CardOverlay.prototype.draw = function(){
  
  var projection = this.getProjection();

  if(!projection){
    return;
  }

  var latLng = /** @type {google.maps.LatLng} */(this.get('position'));

  if(!latLng){
    this.close();
    return;
  }

  var pos = projection.fromLatLngToDivPixel(latLng);

  var width = this.contentContainer_.offsetWidth;
  var height = this.bubble_.offsetHeight;

  if(!width){
    return;
  }

  var top = pos.y - height;

  var left = pos.x - width;

  this.bubble_.style['top'] = this.px(top);
  this.bubble_.style['left'] = this.px(left);
   
}

CardOverlay.prototype.onAdd = function(){
  console.log(this.bubble_);
  if(!this.bubble_){
    
    this.buildDom_();
    console.log(this.bubble_);
  }

  var panes = this.getPanes();
  if(panes){
    panes.floatPane.appendChild(this.bubble_);
  }

}

CardOverlay.prototype.onRemove = function(){

  if(this.bubble_ && this.bubble_.parentNode){
    this.bubble_.parentNode.removeChild(this.bubble_);
  }

}

CardOverlay.prototype.isOpen = function(){
  return this.isOpen_;
}

CardOverlay.prototype.close = function(){
  if(this.bubble_){
    this.bubble_.style['display'] = 'none';
  }

  this.isOpen_ = false;
}

CardOverlay.prototype.open = function(opt_map, opt_anchor){
  var that = this;
  window.setTimeout(function(){
    that.open_(opt_map,opt_anchor);
  },0);
}

CardOverlay.prototype.open_ = function(opt_map, opt_anchor){
  this.updateContent_()
  if(opt_map){
    this.setMap(opt_map);
  }

  if(opt_anchor){
    this.set('anchor',opt_anchor);
    this.bindTo('anchorPoint', opt_anchor);
    this.bindTo('position', opt_anchor);

  }

  this.bubble_.style['display'] = '';

  this.redraw_();
  this.isOpen_ = true;
}

CardOverlay.prototype.redraw_ = function(){
  this.figureOutSize_();
  //this.positionCloseButton_();
  this.draw();
}

CardOverlay.prototype.figureOutSize_ = function(){
  this.contentContainer_.style['width'] = '200px';
  this.contentContainer_.style['height'] = '200px';
}

CardOverlay.prototype.updateContent_ = function(){
  if(!this.content_){
    return;
  }
  this.removeChildren_(this.content_);
  
  var content = this.getContent();
  if(content){
    if(typeof content == 'string'){
      //pendiente
      content = this.htmlToDocumentFragment_(content);
    }
    this.content_.appendChild(content);

    //falta :C
  }
}

CardOverlay.prototype.removeChildren_ = function(node){
  if(!node){
    return;
  }
  var child;
  while(child = node.firstChild){
    node.removeChild(child);
  }
}
CardOverlay.prototype.htmlToDocumentFragment_ = function(htmlString){
  htmlString = htmlString.replace(/^\s*([\S\s]*)\b\s*$/, '$1');
  var tempDiv = document.createElement('DIV');
  tempDiv.innerHTML = htmlString;
  if (tempDiv.childNodes.length == 1) {
    return /** @type {!Node} */ (tempDiv.removeChild(tempDiv.firstChild));
  } else {
    var fragment = document.createDocumentFragment();
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }
    return fragment;
}
}
CardOverlay.prototype.getContent = function(){
  return /** @type {Node|string} */ (this.get('content'));
}
CardOverlay.prototype.extends = function(obj1, obj2) {
  return (function(object){
    for (var property in object.prototype){
      this.prototype[property] = object.prototype[property];
    }
    return this;
  }).apply(obj1,[obj2]);
}

export class InfoBubbleGenerator{
  infobubble:any;
  constructor(options:any,google:any){
    this.infobubble = new CardOverlay(options, google);
  }
  getInfoBubble(){
    return this.infobubble;
  }
}


export class InfoBubbleTS{
  _bounds:LatLngBounds;
  _image:string;
  _div:HTMLElement = null;
  overlay:any;

  constructor(options:TestOverlay,google:any){
    console.log("estoy en el constructor");
    this.overlay = new USGSOverlay(options, google);
    
    /*
    this.overlay = google.maps.OverlayView();
    this._bounds = new google.maps.LatLngBounds(new google.maps.LatLng(options.bounds.south,options.bounds.west),new google.maps.LatLng(options.bounds.north,options.bounds.east));
    
    this.overlay.draw = () => {
      var self = this;
      if(!div){
      var div = this._div = document.createElement('div');
      div.style.borderStyle = 'none';
      div.style.borderWidth = '0px';
      div.style.position = 'absolute';

      var img = document.createElement('img');
      img.src = this._image;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.position = 'absolute';
      div.appendChild(img);
      }
      var panes = this.overlay.getPanes();
      panes.overlayLayer.appendChild(div);
    

    
      var overlayProjection = this.overlay.getProjection();

      var sw = overlayProjection.fromLatLngToDivPixel(this._bounds.getSouthWest());
      var ne = overlayProjection.fromLatLngToDivPixel(this._bounds.getNorthEast());

      div.style.left = sw.x + 'px';
      div.style.top = ne.y + 'px';
      div.style.width = '1000px';
      div.style.height = '1000px';
    }

    this.overlay.onRemove = () => {
      this._div.parentNode.removeChild(this._div);
      this._div = null;
      */
    }


  toogle(){
    this.overlay.toggle();
  }
  setMap(map:GoogleMap){
    this.overlay.setMap(map);
  }
  getOverlay(){
    return this.overlay;
  }

}

function USGSOverlay(options:TestOverlay, google:any) {
  var bounds:LatLngBounds;
  this.extend(USGSOverlay, google.maps.OverlayView)
  this.bounds = new google.maps.LatLngBounds(new google.maps.LatLng(options.bounds.south,options.bounds.west),new google.maps.LatLng(options.bounds.north,options.bounds.east));
  this.image = options.image;
  //this.map = options.map;
  
  var div:HTMLElement;
  this.div = null;

  this.setMap(this.map);
}

USGSOverlay.prototype.onAdd = function(){
  var div = document.createElement('div');
        div.style.borderStyle = 'none';
        div.style.borderWidth = '0px';
        div.style.position = 'absolute';

        // Create the img element and attach it to the div.
        var img = document.createElement('img');
        img.src = this.image;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.position = 'absolute';
        div.appendChild(img);

        this.div = div;

        // Add the element to the "overlayLayer" pane.
        var panes = this.getPanes();
        panes.overlayLayer.appendChild(div);
}


USGSOverlay.prototype.draw = function(){
    // We use the south-west and north-east
        // coordinates of the overlay to peg it to the correct position and size.
        // To do this, we need to retrieve the projection from the overlay.
        var overlayProjection = this.getProjection();

        // Retrieve the south-west and north-east coordinates of this overlay
        // in LatLngs and convert them to pixel coordinates.
        // We'll use these coordinates to resize the div.
        var sw = overlayProjection.fromLatLngToDivPixel(this.bounds.getSouthWest());
        var ne = overlayProjection.fromLatLngToDivPixel(this.bounds.getNorthEast());

        // Resize the image's div to fit the indicated dimensions.
        var div = this.div;
        div.style.left = sw.x + 'px';
        div.style.top = ne.y + 'px';
        div.style.width = (ne.x - sw.x) + 'px';
        div.style.height = (sw.y - ne.y) + 'px';
}

USGSOverlay.prototype.onRemove = function() {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
      };



USGSOverlay.prototype.extend = (obj1, obj2) => {
  return (function(object){
    for (var property in object.prototype){
      this.prototype[property] = object.prototype[property];
    }
    return this;
  }).apply(obj1,[obj2]);
}

USGSOverlay.prototype.hide = function(){
  if(this.div){
    this.div.visibility = 'hidden';
  }
}

USGSOverlay.prototype.show = function(){
  if(this.div){
    this.div.style.visibility = 'visible';
  }
}

USGSOverlay.prototype.toggle = function(){
  if(this.div){
    console.log(this.div.style.visibility);
    if(this.div.style.visibility === 'visible'){
      this.div.style.visibility ='hidden';
    }else{
      this.div.style.visibility = 'visible';
    }
  }
}

USGSOverlay.prototype.toggleDOM = function(map){
  //console.log(this.map);
  var that = this;
  if(this.getMap() != null){
    that.setMap(null);
  }else{
    that.setMap(map);
  }
}





export interface InfoBubble extends MVCObject{
  constructor():void;
  draw():void;
  getMap():GoogleMap;
  getPanes():MapPanes;
  getProjection():MapCanvasProjection;
  onAdd():void;
  onRemove():void;
  setMap(map:GoogleMap):void;
  open(map?:GoogleMap,marker?:Marker):void;
  close():void;
}

function InfoBubble(opt_options, google:any) {
  console.log(opt_options);
  this.extend(InfoBubble, google.maps.OverlayView);
  this.tabs_ = [];
  this.activeTab_ = null;
  this.baseZIndex_ = 100;
  this.isOpen_ = false;
  var options = opt_options || {}; 
  if (options['backgroundColor'] == undefined) {
    options['backgroundColor'] = this.BACKGROUND_COLOR_;
    
  }

  if (options['borderColor'] == undefined) {
    options['borderColor'] = this.BORDER_COLOR_;
    
  }

  if (options['borderRadius'] == undefined) {
    options['borderRadius'] = this.BORDER_RADIUS_;
  }

  if (options['borderWidth'] == undefined) {
    options['borderWidth'] = this.BORDER_WIDTH_;
  }

  if (options['padding'] == undefined) {
    options['padding'] = this.PADDING_;
  }

  if (options['arrowPosition'] == undefined) {
    options['arrowPosition'] = this.ARROW_POSITION_;
  }

  if (options['disableAutoPan'] == undefined) {
    options['disableAutoPan'] = false;
  }

  if (options['disableAnimation'] == undefined) {
    options['disableAnimation'] = false;
  }

  if (options['minWidth'] == undefined) {
    options['minWidth'] = this.MIN_WIDTH_;
  }

  if (options['shadowStyle'] == undefined) {
    options['shadowStyle'] = this.SHADOW_STYLE_;
  }

  if (options['arrowSize'] == undefined) {
    options['arrowSize'] = this.ARROW_SIZE_;
  }

  if (options['arrowStyle'] == undefined) {
    options['arrowStyle'] = this.ARROW_STYLE_;
  }

  if (options['closeSrc'] == undefined) {
    options['closeSrc'] = this.CLOSE_SRC_;
  }
  
  this.setValues(options);
  this.buildDom_(google);
  
  
}
//window['InfoBubble'] = InfoBubble;

InfoBubble.prototype.ARROW_SIZE_ = 15;

InfoBubble.prototype.ARROW_STYLE_ = 0;

InfoBubble.prototype.SHADOW_STYLE_ = 1;

InfoBubble.prototype.MIN_WIDTH_ = 50;

InfoBubble.prototype.ARROW_POSITION_ = 50;

InfoBubble.prototype.PADDING_ = 10;

InfoBubble.prototype.BORDER_WIDTH_ = 1;

InfoBubble.prototype.BORDER_COLOR_ = '#ccc';

InfoBubble.prototype.BORDER_RADIUS_ = 10;

InfoBubble.prototype.BACKGROUND_COLOR_ = '#fff';

InfoBubble.prototype.CLOSE_SRC_ = 'https://maps.gstatic.com/intl/en_us/mapfiles/iw_close.gif';

InfoBubble.prototype.extend = function(obj1, obj2) {
  return (function(object) {
    for (var property in object.prototype) {
      this.prototype[property] = object.prototype[property];
    }
    return this;
  }).apply(obj1, [obj2]);
};


InfoBubble.prototype.buildDom_ = function(google) {
  console.log("Enter to build dom");
  var bubble = this.bubble_ = document.createElement('div');
  bubble.style['position'] = 'absolute';
  bubble.style['zIndex'] = this.baseZIndex_;
  
  var tabsContainer = this.tabsContainer_ = document.createElement('div');
  tabsContainer.style['position'] = 'relative';

  //Close Button
  var close = this.close_ = document.createElement('img');
  close.style['position'] = 'absolute';
  close.style['border'] = '0';
  close.style['zIndex'] = this.baseZIndex_ + 1;
  close.style['cursor'] = 'pointer';
  close.src = this.get('closeSrc');
  var that = this;
  var contentContainer = this.contetContainer_ = document.createElement('div');

  contentContainer.style['overflowX'] = 'auto';
  contentContainer.style['overflowY'] = 'auto';
  contentContainer.style['cursor'] = 'default';
  contentContainer.style['clear'] = 'both';
  contentContainer.style['position'] = 'relative';

  var content = this.content_ = document.createElement('div');
  contentContainer.appendChild(content);

  //Arrow
  var arrow = this.arrow_ = document.createElement('div');

  arrow.style['position'] = 'relative';

  var arrowOuter = this.arrowOuter_ = document.createElement('div');
  var arrowInner = this.arrowInner_ = document.createElement('div');

  var arrowSize = this.getArrowSize_();

  arrowOuter.style['position'] = arrowInner.style['position'] = 'absolute';
  arrowOuter.style['left'] = arrowInner.style['left'] = '50%';
  arrowOuter.style['height'] = arrowInner.style['height'] = '0';
  arrowOuter.style['width'] = arrowInner.style['height'] = '0';
  arrowOuter.style['marginLeft'] = this.px(-arrowSize);
  arrowOuter.style['borderWidth'] = this.px(arrowSize);
  arrowOuter.style['borderBottomWidth'] = '0';

  //Shadow
  var bubbleShadow = this.bubbleShadow_ = document.createElement('div');
  bubbleShadow.style['position'] = 'absolute';
  //Hide the InfoBubble by default
  bubble.style['display'] = bubbleShadow.style['display'] = 'none';

  bubble.appendChild(this.tabsContainer_);
  bubble.appendChild(close);
  bubble.appendChild(contentContainer);
  arrow.appendChild(arrowOuter);
  arrow.appendChild(arrowInner);
  bubble.appendChild(arrow);

  console.log(this.bubble);

  var stylesheet = document.createElement('style');
  stylesheet.setAttribute('type','text/css');

  this.animationName_ = '_ibani_' + Math.round(Math.random() * 10000);
  
  var css = '.' + this.animationName_ + '{-webkit-animation-name:' +
      this.animationName_ + ';-webkit-animation-duration:0.5s;' +
      '-webkit-animation-iteration-count:1;}' +
      '@-webkit-keyframes ' + this.animationName_ + ' {from {' +
      '-webkit-transform: scale(0)}50% {-webkit-transform: scale(1.2)}90% ' +
      '{-webkit-transform: scale(0.95)}to {-webkit-transform: scale(1)}}';
  
  stylesheet.textContent = css;
  document.getElementsByTagName('name')[0].appendChild(stylesheet);
  
}


InfoBubble.prototype.setBackgroundClassName = function(className){
  console.log("setBackgroundClassName");
  this.set('backgroundClassName',className);
};

InfoBubble.prototype['setBackgroundClassName'] = InfoBubble.prototype.setBackgroundClassName;

InfoBubble.prototype.backgroundClassName_changed = function() {
  console.log("backgroundClassName_changed");
  this.content_.className = this.get('backgroundClassName');
}

InfoBubble.prototype['backgroundClassName_changed'] = InfoBubble.prototype.backgroundClassName_changed;

InfoBubble.prototype.setTabClassName = function(className){
  console.log("setTabClassName");
  this.set('tabClassName', className);
};
InfoBubble.prototype['setTabClassName'] = InfoBubble.prototype.setTabClassName;

InfoBubble.prototype.tabClassName_changed = function() {
  console.log("tabClassName_changed");
  this.updateTabStyles_();
};
InfoBubble.prototype['tabClassName_changed'] = InfoBubble.prototype.tabClassName_changed;

InfoBubble.prototype.getArrowStyle_ = function(){
  console.log("getArrowStyle_");
  return parseInt(this.get('arrowStyle'),10) || 0;
};

InfoBubble.prototype.setArrowStyle = function(style){
  console.log("setArrowStyle");
  this.set('arrowStyle',style);
};
InfoBubble.prototype['setArrowStyle'] = InfoBubble.prototype.setArrowStyle;

InfoBubble.prototype.arrowStyle_changed = function() {
  console.log("arrowStyle_changed");
  this.arrowSize_changed();
}
InfoBubble.prototype['arrowStyle_changed'] = InfoBubble.prototype.arrowStyle_changed;

InfoBubble.prototype.getArrowSize_ = function() {
  console.log("getArrowSize_");
  return parseInt(this.get('arrowSize'),10) || 0;
}

InfoBubble.prototype.setArrowSize = function(size) {
  console.log("setArrowSize");
  this.set('arrowSize',size);
}
InfoBubble.prototype['setArrowSize'] = InfoBubble.prototype.setArrowSize;

InfoBubble.prototype.arrowSize_changed = function(){
  console.log("arrowSize_changed");
  this.borderWidth_changed();
};
InfoBubble.prototype['arrowSize_changed'] = InfoBubble.prototype.arrowSize_changed;

InfoBubble.prototype.setArrowPosition = function(pos) {
  console.log("setArrowPosition");
  this.set('arrowPosition',pos);
};
InfoBubble.prototype['setArrowPosition'] = InfoBubble.prototype.setArrowPosition;

InfoBubble.prototype.getArrowPosition_ = function() {
  console.log("getArrowPosition_");
  return parseInt(this.get('arrowPosition'),10) || 0;
};

InfoBubble.prototype.arrowPosition_changed = function() {
  console.log("arrowPosition_changed");
  var pos = this.getArrowPosition_();
  this.arrowOuter_.style['left'] = this.arrowInner_.style['left'] = pos + '%';

  this.redraw_();
};
InfoBubble.prototype['arrowPosition_changed'] = InfoBubble.prototype.arrowPosition_changed;

InfoBubble.prototype.setZIndex = function(zIndex) {
  console.log("setZIndex");
  this.set('zIndex',zIndex);
};
InfoBubble.prototype['zIndex'] = InfoBubble.prototype.setZIndex;

InfoBubble.prototype.getZIndex = function() {
  console.log("getZIndex");
  return parseInt(this.get('zIndex'),10) || this.baseZIndex_;
}

InfoBubble.prototype.zIndex_changed = function() {
  console.log("zIndex_changed");
  var zIndex = this.getZIndex();

  this.bubble_.style['zIndex'] = this.baseZIndex_ = zIndex;
  this.close_.style['zIndex'] = zIndex + 1;
};
InfoBubble.prototype['zIndex_changed'] = InfoBubble.prototype.zIndex_changed;

InfoBubble.prototype.setShadowStyle = function(shadowStyle) {
  console.log("setShadowStyle");
  this.set('shadowStyle', shadowStyle);
};
InfoBubble.prototype['setShadowStyle'] = InfoBubble.prototype.setShadowStyle;

InfoBubble.prototype.getShadowStyle_ = function() {
  console.log("getShadowStyle_");
  return parseInt(this.get('shadowStyle'), 10) || 0;
};

InfoBubble.prototype.shadowStyle_changed = function() {
  console.log("shadowStyle_changed");
  var shadowStyle = this.getShadowStyle_();

  var display = '';
  var shadow = '';
  var backgroundColor = '';
  switch (shadowStyle) {
    case 0:
      display = 'none';
      break;
    case 1:
      shadow = '40px 15px 10px rgba(33,33,33,0.3)';
      backgroundColor = 'transparent';
      break;
    case 2:
      shadow = '0 0 2px rgba(33,33,33,0.3)';
      backgroundColor = 'rgba(33,33,33,0.35)';
      break;
  }
  this.bubbleShadow_.style['boxShadow'] =
      this.bubbleShadow_.style['webkitBoxShadow'] =
      this.bubbleShadow_.style['MozBoxShadow'] = shadow;
  this.bubbleShadow_.style['backgroundColor'] = backgroundColor;
  if (this.isOpen_) {
    this.bubbleShadow_.style['display'] = display;
    this.draw();
  }
};
InfoBubble.prototype['shadowStyle_changed'] = InfoBubble.prototype.shadowStyle_changed;

InfoBubble.prototype.showCloseButton = function() {
  console.log("showCloseButton");
  this.set('hideCloseButton', false);
};
InfoBubble.prototype['showCloseButton'] = InfoBubble.prototype.showCloseButton;

InfoBubble.prototype.hideCloseButton = function() {
  console.log("hideCloseButton");
  this.set('hideCloseButton', true);
};
InfoBubble.prototype['hideCloseButton'] = InfoBubble.prototype.hideCloseButton;

InfoBubble.prototype.hideCloseButton_changed = function() {
  console.log("hideCloseButton_changed");
  this.close_.style['display'] = this.get('hideCloseButton') ? 'none' : '';
};
InfoBubble.prototype['hideCloseButton_changed'] = InfoBubble.prototype.hideCloseButton_changed;

InfoBubble.prototype.setBackgroundColor = function(color) {
  console.log("setBackgroundColor");
  if (color) {
    this.set('backgroundColor', color);
  }
};
InfoBubble.prototype['setBackgroundColor'] = InfoBubble.prototype.setBackgroundColor;

/**
 * backgroundColor changed MVC callback
 */
InfoBubble.prototype.backgroundColor_changed = function() {
  console.log("backgroundColor_changed");
  var backgroundColor = this.get('backgroundColor');
  this.contentContainer_.style['backgroundColor'] = backgroundColor;

  this.arrowInner_.style['borderColor'] = backgroundColor +
      ' transparent transparent';
  this.updateTabStyles_();
};
InfoBubble.prototype['backgroundColor_changed'] = InfoBubble.prototype.backgroundColor_changed;


/**
 * Set the border color
 *
 * @param {string} color The border color.
 */
InfoBubble.prototype.setBorderColor = function(color) {
  console.log("setBorderColor");
  if (color) {
    this.set('borderColor', color);
  }
};
InfoBubble.prototype['setBorderColor'] = InfoBubble.prototype.setBorderColor;

/**
 * borderColor changed MVC callback
 */
InfoBubble.prototype.borderColor_changed = function() {
  console.log("borderColor_changed");
  var borderColor = this.get('borderColor');

  var contentContainer = this.contentContainer_;
  var arrowOuter = this.arrowOuter_;
  contentContainer.style['borderColor'] = borderColor;

  arrowOuter.style['borderColor'] = borderColor +
      ' transparent transparent';

  contentContainer.style['borderStyle'] =
      arrowOuter.style['borderStyle'] =
      this.arrowInner_.style['borderStyle'] = 'solid';

  this.updateTabStyles_();
};
InfoBubble.prototype['borderColor_changed'] = InfoBubble.prototype.borderColor_changed;

/**
 * Set the radius of the border
 *
 * @param {number} radius The radius of the border.
 */
InfoBubble.prototype.setBorderRadius = function(radius) {
  console.log("setBorderRadius");
  this.set('borderRadius', radius);
};
InfoBubble.prototype['setBorderRadius'] = InfoBubble.prototype.setBorderRadius;


/**
 * Get the radius of the border
 *
 * @private
 * @return {number} The radius of the border.
 */
InfoBubble.prototype.getBorderRadius_ = function() {
  console.log("getBorderRadius_");
  return parseInt(this.get('borderRadius'), 10) || 0;
};

/**
 * borderRadius changed MVC callback
 */
InfoBubble.prototype.borderRadius_changed = function() {
  console.log("borderRadius_changed");
  var borderRadius = this.getBorderRadius_();
  var borderWidth = this.getBorderWidth_();

  this.contentContainer_.style['borderRadius'] =
      this.contentContainer_.style['MozBorderRadius'] =
      this.contentContainer_.style['webkitBorderRadius'] =
      this.bubbleShadow_.style['borderRadius'] =
      this.bubbleShadow_.style['MozBorderRadius'] =
      this.bubbleShadow_.style['webkitBorderRadius'] = this.px(borderRadius);

  this.tabsContainer_.style['paddingLeft'] =
      this.tabsContainer_.style['paddingRight'] =
      this.px(borderRadius + borderWidth);

  this.redraw_();
};
InfoBubble.prototype['borderRadius_changed'] = InfoBubble.prototype.borderRadius_changed;

/**
 * Get the width of the border
 *
 * @private
 * @return {number} width The width of the border.
 */
InfoBubble.prototype.getBorderWidth_ = function() {
  console.log("getBorderWidth_");
  return parseInt(this.get('borderWidth'), 10) || 0;
};

/**
 * Set the width of the border
 *
 * @param {number} width The width of the border.
 */
InfoBubble.prototype.setBorderWidth = function(width) {
  console.log("setBorderWidth");
  this.set('borderWidth', width);
};
InfoBubble.prototype['setBorderWidth'] = InfoBubble.prototype.setBorderWidth;

/**
 * borderWidth change MVC callback
 */
InfoBubble.prototype.borderWidth_changed = function() {
  console.log("borderWidth_changed");
  var borderWidth = this.getBorderWidth_();

  this.contentContainer_.style['borderWidth'] = this.px(borderWidth);
  this.tabsContainer_.style['top'] = this.px(borderWidth);

  this.updateArrowStyle_();
  this.updateTabStyles_();
  this.borderRadius_changed();
  this.redraw_();
};
InfoBubble.prototype['borderWidth_changed'] = InfoBubble.prototype.borderWidth_changed;


/**
 * Update the arrow style
 * @private
 */
InfoBubble.prototype.updateArrowStyle_ = function() {
  console.log("updateArrowStyle_");
  var borderWidth = this.getBorderWidth_();
  var arrowSize = this.getArrowSize_();
  var arrowStyle = this.getArrowStyle_();
  var arrowOuterSizePx = this.px(arrowSize);
  var arrowInnerSizePx = this.px(Math.max(0, arrowSize - borderWidth));

  var outer = this.arrowOuter_;
  var inner = this.arrowInner_;

  this.arrow_.style['marginTop'] = this.px(-borderWidth);
  outer.style['borderTopWidth'] = arrowOuterSizePx;
  inner.style['borderTopWidth'] = arrowInnerSizePx;

  // Full arrow or arrow pointing to the left
  if (arrowStyle == 0 || arrowStyle == 1) {
    outer.style['borderLeftWidth'] = arrowOuterSizePx;
    inner.style['borderLeftWidth'] = arrowInnerSizePx;
  } else {
    outer.style['borderLeftWidth'] = inner.style['borderLeftWidth'] = 0;
  }

  // Full arrow or arrow pointing to the right
  if (arrowStyle == 0 || arrowStyle == 2) {
    outer.style['borderRightWidth'] = arrowOuterSizePx;
    inner.style['borderRightWidth'] = arrowInnerSizePx;
  } else {
    outer.style['borderRightWidth'] = inner.style['borderRightWidth'] = 0;
  }

  if (arrowStyle < 2) {
    outer.style['marginLeft'] = this.px(-(arrowSize));
    inner.style['marginLeft'] = this.px(-(arrowSize - borderWidth));
  } else {
    outer.style['marginLeft'] = inner.style['marginLeft'] = 0;
  }

  // If there is no border then don't show thw outer arrow
  if (borderWidth == 0) {
    outer.style['display'] = 'none';
  } else {
    outer.style['display'] = '';
  }
};


/**
 * Set the padding of the InfoBubble
 *
 * @param {number} padding The padding to apply.
 */
InfoBubble.prototype.setPadding = function(padding) {
  console.log("setPadding");
  this.set('padding', padding);
};
InfoBubble.prototype['setPadding'] = InfoBubble.prototype.setPadding;


/**
 * Set the close image url
 *
 * @param {string} src The url of the image used as a close icon
 */
InfoBubble.prototype.setCloseSrc = function(src) {
  console.log("setCloseSrc");
  if (src && this.close_) {
    this.close_.src = src;
  }
};
InfoBubble.prototype['setCloseSrc'] = InfoBubble.prototype.setCloseSrc;

/**
 * Set the padding of the InfoBubble
 *
 * @private
 * @return {number} padding The padding to apply.
 */
InfoBubble.prototype.getPadding_ = function() {
  console.log("getPadding_");
  return parseInt(this.get('padding'), 10) || 0;
};


/**
 * padding changed MVC callback
 */
InfoBubble.prototype.padding_changed = function() {
  console.log("padding_changed");
  var padding = this.getPadding_();
  this.contentContainer_.style['padding'] = this.px(padding);
  this.updateTabStyles_();

  this.redraw_();
};
InfoBubble.prototype['padding_changed'] = InfoBubble.prototype.padding_changed;

/**
 * Add px extention to the number
 *
 * @param {number} num The number to wrap.
 * @return {string|number} A wrapped number.
 */
InfoBubble.prototype.px = function(num) {
  console.log("px");
  if (num) {
    // 0 doesn't need to be wrapped
    return num + 'px';
  }
  return num;
};

/*
InfoBubble.prototype.addEvents_ = function() {
  // We want to cancel all the events so they do not go to the map
  var events = ['mousedown', 'mousemove', 'mouseover', 'mouseout', 'mouseup',
      'mousewheel', 'DOMMouseScroll', 'touchstart', 'touchend', 'touchmove',
      'dblclick', 'contextmenu', 'click'];

  var bubble = this.bubble_;
  this.listeners_ = [];
  for (var i = 0, event; event = events[i]; i++) {
    this.listeners_.push(
      google.maps.event.addDomListener(bubble, event, function(e) {
        e.cancelBubble = true;
        if (e.stopPropagation) {
          e.stopPropagation();
        }
      })
    );
  }
};

*/
/**
 * On Adding the InfoBubble to a map
 * Implementing the OverlayView interface
 */
InfoBubble.prototype.onAdd = function() {
  console.log("onAdd");
  if (!this.bubble_) {
    this.buildDom_();
  }

  //this.addEvents_();

  var panes = this.getPanes();
  if (panes) {
    panes.floatPane.appendChild(this.bubble_);
    panes.floatShadow.appendChild(this.bubbleShadow_);
  }

  /* once the infoBubble has been added to the DOM, fire 'domready' event */
  //google.maps.event.trigger(this, 'domready');
};
InfoBubble.prototype['onAdd'] = InfoBubble.prototype.onAdd;

/**
 * Draw the InfoBubble
 * Implementing the OverlayView interface
 */
InfoBubble.prototype.draw = function() {
  console.log("draw");
  var projection = this.getProjection();

  if (!projection) {
    // The map projection is not ready yet so do nothing
    return;
  }

  var latLng = /** @type {google.maps.LatLng} */ (this.get('position'));

  if (!latLng) {
    this.close();
    return;
  }

  var tabHeight = 0;

  if (this.activeTab_) {
    tabHeight = this.activeTab_.offsetHeight;
  }

  var anchorHeight = this.getAnchorHeight_();
  var arrowSize = this.getArrowSize_();
  var arrowPosition = this.getArrowPosition_();

  arrowPosition = arrowPosition / 100;

  var pos = projection.fromLatLngToDivPixel(latLng);
  var width = this.contentContainer_.offsetWidth;
  var height = this.bubble_.offsetHeight;

  if (!width) {
    return;
  }

  // Adjust for the height of the info bubble
  var top = pos.y - (height + arrowSize);

  if (anchorHeight) {
    // If there is an anchor then include the height
    top -= anchorHeight;
  }

  var left = pos.x - (width * arrowPosition);

  this.bubble_.style['top'] = this.px(top);
  this.bubble_.style['left'] = this.px(left);

  var shadowStyle = parseInt(this.get('shadowStyle'), 10);

  switch (shadowStyle) {
    case 1:
      // Shadow is behind
      this.bubbleShadow_.style['top'] = this.px(top + tabHeight - 1);
      this.bubbleShadow_.style['left'] = this.px(left);
      this.bubbleShadow_.style['width'] = this.px(width);
      this.bubbleShadow_.style['height'] =
          this.px(this.contentContainer_.offsetHeight - arrowSize);
      break;
    case 2:
      // Shadow is below
      width = width * 0.8;
      if (anchorHeight) {
        this.bubbleShadow_.style['top'] = this.px(pos.y);
      } else {
        this.bubbleShadow_.style['top'] = this.px(pos.y + arrowSize);
      }
      this.bubbleShadow_.style['left'] = this.px(pos.x - width * arrowPosition);

      this.bubbleShadow_.style['width'] = this.px(width);
      this.bubbleShadow_.style['height'] = this.px(2);
      break;
  }
};
InfoBubble.prototype['draw'] = InfoBubble.prototype.draw;

/**
 * Removing the InfoBubble from a map
 */
InfoBubble.prototype.onRemove = function() {
  console.log("onRemove");
  if (this.bubble_ && this.bubble_.parentNode) {
    this.bubble_.parentNode.removeChild(this.bubble_);
  }
  if (this.bubbleShadow_ && this.bubbleShadow_.parentNode) {
    this.bubbleShadow_.parentNode.removeChild(this.bubbleShadow_);
  }
  /***
  for (var i = 0, listener; listener = this.listeners_[i]; i++) {
    google.maps.event.removeListener(listener);
  }
  */
};
InfoBubble.prototype['onRemove'] = InfoBubble.prototype.onRemove;

/**
 * Is the InfoBubble open
 *
 * @return {boolean} If the InfoBubble is open.
 */
InfoBubble.prototype.isOpen = function() {
  console.log("isOpen");
  return this.isOpen_;
};
InfoBubble.prototype['isOpen'] = InfoBubble.prototype.isOpen;


/**
 * Close the InfoBubble
 */
InfoBubble.prototype.close = function() {
  console.log("close");
  if (this.bubble_) {
    this.bubble_.style['display'] = 'none';
    // Remove the animation so we next time it opens it will animate again
    this.bubble_.className =
        this.bubble_.className.replace(this.animationName_, '');
  }

  if (this.bubbleShadow_) {
    this.bubbleShadow_.style['display'] = 'none';
    this.bubbleShadow_.className =
        this.bubbleShadow_.className.replace(this.animationName_, '');
  }
  this.isOpen_ = false;
};
InfoBubble.prototype['close'] = InfoBubble.prototype.close;


/**
 * Open the InfoBubble (asynchronous).
 *
 * @param {google.maps.Map=} opt_map Optional map to open on.
 * @param {google.maps.MVCObject=} opt_anchor Optional anchor to position at.
 */
InfoBubble.prototype.open = function(opt_map, opt_anchor) {
  console.log("open");
  var that = this;
  window.setTimeout(function() {
    that.open_(opt_map, opt_anchor);
  }, 0);
};

/**
 * Open the InfoBubble
 * @private
 * @param {google.maps.Map=} opt_map Optional map to open on.
 * @param {google.maps.MVCObject=} opt_anchor Optional anchor to position at.
 */
InfoBubble.prototype.open_ = function(opt_map, opt_anchor) {
  console.log("open_");
  this.updateContent_();

  if (opt_map) {
    this.setMap(opt_map);
  }

  if (opt_anchor) {
    this.set('anchor', opt_anchor);
    this.bindTo('anchorPoint', opt_anchor);
    this.bindTo('position', opt_anchor);
  }

  // Show the bubble and the show
  this.bubble_.style['display'] = this.bubbleShadow_.style['display'] = '';
  var animation = !this.get('disableAnimation');

  if (animation) {
    // Add the animation
    this.bubble_.className += ' ' + this.animationName_;
    this.bubbleShadow_.className += ' ' + this.animationName_;
  }

  this.redraw_();
  this.isOpen_ = true;

  var pan = !this.get('disableAutoPan');
  if (pan) {
    var that = this;
    window.setTimeout(function() {
      // Pan into view, done in a time out to make it feel nicer :)
      that.panToView();
    }, 200);
  }
};
InfoBubble.prototype['open'] = InfoBubble.prototype.open;

/**
 * Set the position of the InfoBubble
 *
 * @param {google.maps.LatLng} position The position to set.
 */
InfoBubble.prototype.setPosition = function(position) {
  console.log("setPosition");
  if (position) {
    this.set('position', position);
  }
};
InfoBubble.prototype['setPosition'] = InfoBubble.prototype.setPosition;


/**
 * Returns the position of the InfoBubble
 *
 * @return {google.maps.LatLng} the position.
 */
InfoBubble.prototype.getPosition = function() {
  console.log("getPosition");
  return /** @type {google.maps.LatLng} */ (this.get('position'));
};
InfoBubble.prototype['getPosition'] = InfoBubble.prototype.getPosition;


/**
 * position changed MVC callback
 */
InfoBubble.prototype.position_changed = function() {
  console.log("position_changed");
  this.draw();
};
InfoBubble.prototype['position_changed'] = InfoBubble.prototype.position_changed;


/**
 * Pan the InfoBubble into view
 */
InfoBubble.prototype.panToView = function() {
  console.log("panToView");
  var projection = this.getProjection();

  if (!projection) {
    // The map projection is not ready yet so do nothing
    return;
  }

  if (!this.bubble_) {
    // No Bubble yet so do nothing
    return;
  }

  var anchorHeight = this.getAnchorHeight_();
  var height = this.bubble_.offsetHeight + anchorHeight;
  var map = this.get('map');
  var mapDiv = map.getDiv();
  var mapHeight = mapDiv.offsetHeight;

  var latLng = this.getPosition();
  var centerPos = projection.fromLatLngToContainerPixel(map.getCenter());
  var pos = projection.fromLatLngToContainerPixel(latLng);

  // Find out how much space at the top is free
  var spaceTop = centerPos.y - height;

  // Fine out how much space at the bottom is free
  var spaceBottom = mapHeight - centerPos.y;

  var needsTop = spaceTop < 0;
  var deltaY = 0;

  if (needsTop) {
    spaceTop *= -1;
    deltaY = (spaceTop + spaceBottom) / 2;
  }

  pos.y -= deltaY;
  latLng = projection.fromContainerPixelToLatLng(pos);

  if (map.getCenter() != latLng) {
    map.panTo(latLng);
  }
};
InfoBubble.prototype['panToView'] = InfoBubble.prototype.panToView;


/**
 * Converts a HTML string to a document fragment.
 *
 * @param {string} htmlString The HTML string to convert.
 * @return {Node} A HTML document fragment.
 * @private
 */
InfoBubble.prototype.htmlToDocumentFragment_ = function(htmlString) {
  console.log("htmlToDocumentFragment_");
  htmlString = htmlString.replace(/^\s*([\S\s]*)\b\s*$/, '$1');
  var tempDiv = document.createElement('DIV');
  tempDiv.innerHTML = htmlString;
  if (tempDiv.childNodes.length == 1) {
    return /** @type {!Node} */ (tempDiv.removeChild(tempDiv.firstChild));
  } else {
    var fragment = document.createDocumentFragment();
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }
    return fragment;
  }
};


/**
 * Removes all children from the node.
 *
 * @param {Node} node The node to remove all children from.
 * @private
 */
InfoBubble.prototype.removeChildren_ = function(node) {
  console.log("removeChildren_");
  if (!node) {
    return;
  }

  var child;
  while (child = node.firstChild) {
    node.removeChild(child);
  }
};


/**
 * Sets the content of the infobubble.
 *
 * @param {string|Node} content The content to set.
 */
InfoBubble.prototype.setContent = function(content) {
  console.log("setContent");
  this.set('content', content);
};
InfoBubble.prototype['setContent'] = InfoBubble.prototype.setContent;


/**
 * Get the content of the infobubble.
 *
 * @return {string|Node} The marker content.
 */
InfoBubble.prototype.getContent = function() {
  console.log("getContent");
  return /** @type {Node|string} */ (this.get('content'));
};
InfoBubble.prototype['getContent'] = InfoBubble.prototype.getContent;


/**
 * Sets the marker content and adds loading events to images
 */
InfoBubble.prototype.updateContent_ = function() {
  console.log("updateContent_");
  if (!this.content_) {
    // The Content area doesnt exist.
    return;
  }

  this.removeChildren_(this.content_);
  var content = this.getContent();
  if (content) {
    if (typeof content == 'string') {
      content = this.htmlToDocumentFragment_(content);
    }
    this.content_.appendChild(content);

    var that = this;
    var images = this.content_.getElementsByTagName('IMG');
    for (var i = 0, image; image = images[i]; i++) {
      // Because we don't know the size of an image till it loads, add a
      // listener to the image load so the marker can resize and reposition
      // itself to be the correct height.
      google.maps.event.addDomListener(image, 'load', function() {
        that.imageLoaded_();
      });
    }
  }
  this.redraw_();
};

/**
 * Image loaded
 * @private
 */
InfoBubble.prototype.imageLoaded_ = function() {
  console.log("imageLoaded_");
  var pan = !this.get('disableAutoPan');
  this.redraw_();
  if (pan && (this.tabs_.length == 0 || this.activeTab_.index == 0)) {
    this.panToView();
  }
};


/**
 * Updates the styles of the tabs
 * @private
 */
InfoBubble.prototype.updateTabStyles_ = function() {
  console.log("updateTabStyles_");
  if (this.tabs_ && this.tabs_.length) {
    for (var i = 0, tab; tab = this.tabs_[i]; i++) {
      this.setTabStyle_(tab.tab);
    }
    this.activeTab_.style['zIndex'] = this.baseZIndex_;
    var borderWidth = this.getBorderWidth_();
    var padding = this.getPadding_() / 2;
    this.activeTab_.style['borderBottomWidth'] = 0;
    this.activeTab_.style['paddingBottom'] = this.px(padding + borderWidth);
  }
};


/**
 * Sets the style of a tab
 * @private
 * @param {Element} tab The tab to style.
 */
InfoBubble.prototype.setTabStyle_ = function(tab) {
  console.log("setTabStyle_");
  var backgroundColor = this.get('backgroundColor');
  var borderColor = this.get('borderColor');
  var borderRadius = this.getBorderRadius_();
  var borderWidth = this.getBorderWidth_();
  var padding = this.getPadding_();

  var marginRight = this.px(-(Math.max(padding, borderRadius)));
  var borderRadiusPx = this.px(borderRadius);

  var index = this.baseZIndex_;
  if (tab.index) {
    index -= tab.index;
  }

  // The styles for the tab
  var styles = {
    'cssFloat': 'left',
    'position': 'relative',
    'cursor': 'pointer',
    'backgroundColor': backgroundColor,
    'border': this.px(borderWidth) + ' solid ' + borderColor,
    'padding': this.px(padding / 2) + ' ' + this.px(padding),
    'marginRight': marginRight,
    'whiteSpace': 'nowrap',
    'borderRadiusTopLeft': borderRadiusPx,
    'MozBorderRadiusTopleft': borderRadiusPx,
    'webkitBorderTopLeftRadius': borderRadiusPx,
    'borderRadiusTopRight': borderRadiusPx,
    'MozBorderRadiusTopright': borderRadiusPx,
    'webkitBorderTopRightRadius': borderRadiusPx,
    'zIndex': index,
    'display': 'inline'
  };

  for (var style in styles) {
    tab.style[style] = styles[style];
  }

  var className = this.get('tabClassName');
  if (className != undefined) {
    tab.className += ' ' + className;
  }
};


/**
 * Add user actions to a tab
 * @private
 * @param {Object} tab The tab to add the actions to.
 */
InfoBubble.prototype.addTabActions_ = function(tab) {
  console.log("addTabActions_");
  var that = this;
  tab.listener_ = google.maps.event.addDomListener(tab, 'click', function() {
    that.setTabActive_(this);
  });
};

/**
 * Set a tab at a index to be active
 *
 * @param {number} index The index of the tab.
 */
InfoBubble.prototype.setTabActive = function(index) {
  console.log("setTabActive");
  var tab = this.tabs_[index - 1];

  if (tab) {
    this.setTabActive_(tab.tab);
  }
};
InfoBubble.prototype['setTabActive'] = InfoBubble.prototype.setTabActive;


/**
 * Set a tab to be active
 * @private
 * @param {Object} tab The tab to set active.
 */
InfoBubble.prototype.setTabActive_ = function(tab) {
  console.log("setTabActive_");
  if (!tab) {
    this.setContent('');
    this.updateContent_();
    return;
  }

  var padding = this.getPadding_() / 2;
  var borderWidth = this.getBorderWidth_();

  if (this.activeTab_) {
    var activeTab = this.activeTab_;
    activeTab.style['zIndex'] = this.baseZIndex_ - activeTab.index;
    activeTab.style['paddingBottom'] = this.px(padding);
    activeTab.style['borderBottomWidth'] = this.px(borderWidth);
  }

  tab.style['zIndex'] = this.baseZIndex_;
  tab.style['borderBottomWidth'] = 0;
  tab.style['marginBottomWidth'] = '-10px';
  tab.style['paddingBottom'] = this.px(padding + borderWidth);

  this.setContent(this.tabs_[tab.index].content);
  this.updateContent_();

  this.activeTab_ = tab;

  this.redraw_();
};


/**
 * Set the max width of the InfoBubble
 *
 * @param {number} width The max width.
 */
InfoBubble.prototype.setMaxWidth = function(width) {
  console.log("setMaxWidth");
  this.set('maxWidth', width);
};
InfoBubble.prototype['setMaxWidth'] = InfoBubble.prototype.setMaxWidth;


/**
 * maxWidth changed MVC callback
 */
InfoBubble.prototype.maxWidth_changed = function() {
  console.log("maxWidth_changed");
  this.redraw_();
};
InfoBubble.prototype['maxWidth_changed'] = InfoBubble.prototype.maxWidth_changed;


/**
 * Set the max height of the InfoBubble
 *
 * @param {number} height The max height.
 */
InfoBubble.prototype.setMaxHeight = function(height) {
  console.log("setMaxHeight");
  this.set('maxHeight', height);
};
InfoBubble.prototype['setMaxHeight'] = InfoBubble.prototype.setMaxHeight;


/**
 * maxHeight changed MVC callback
 */
InfoBubble.prototype.maxHeight_changed = function() {
  console.log("maxHeight_changed");
  this.redraw_();
};
InfoBubble.prototype['maxHeight_changed'] = InfoBubble.prototype.maxHeight_changed;


/**
 * Set the min width of the InfoBubble
 *
 * @param {number} width The min width.
 */
InfoBubble.prototype.setMinWidth = function(width) {
  console.log("setMinWidth");  
  this.set('minWidth', width);
};
InfoBubble.prototype['setMinWidth'] = InfoBubble.prototype.setMinWidth;


/**
 * minWidth changed MVC callback
 */
InfoBubble.prototype.minWidth_changed = function() {
   console.log("minWidth_changed"); 
  this.redraw_();
};
InfoBubble.prototype['minWidth_changed'] = InfoBubble.prototype.minWidth_changed;


/**
 * Set the min height of the InfoBubble
 *
 * @param {number} height The min height.
 */
InfoBubble.prototype.setMinHeight = function(height) {
  console.log("setMinHeight"); 
  this.set('minHeight', height);
};
InfoBubble.prototype['setMinHeight'] = InfoBubble.prototype.setMinHeight;


/**
 * minHeight changed MVC callback
 */
InfoBubble.prototype.minHeight_changed = function() {
  console.log("minHeight_changed");
  this.redraw_();
};
InfoBubble.prototype['minHeight_changed'] = InfoBubble.prototype.minHeight_changed;


/**
 * Add a tab
 *
 * @param {string} label The label of the tab.
 * @param {string|Element} content The content of the tab.
 */
InfoBubble.prototype.addTab = function(label, content) {
  console.log("addTab");
  var tab = document.createElement('DIV');
  tab.innerHTML = label;

  this.setTabStyle_(tab);
  this.addTabActions_(tab);

  this.tabsContainer_.appendChild(tab);

  this.tabs_.push({
    label: label,
    content: content,
    tab: tab
  });

  tab.tabIndex = this.tabs_.length - 1;
  tab.style['zIndex'] = (this.baseZIndex_ - tab.tabIndex).toString();

  if (!this.activeTab_) {
    this.setTabActive_(tab);
  }

  tab.className = tab.className + ' ' + this.animationName_;

  this.redraw_();
};
InfoBubble.prototype['addTab'] = InfoBubble.prototype.addTab;


/**
 * Update a tab at a speicifc index
 *
 * @param {number} index The index of the tab.
 * @param {?string} opt_label The label to change to.
 * @param {?string} opt_content The content to update to.
 */
InfoBubble.prototype.updateTab = function(index, opt_label, opt_content) {
  if (!this.tabs_.length || index < 0 || index >= this.tabs_.length) {
    return;
  }

  var tab = this.tabs_[index];
  if (opt_label != undefined) {
    tab.tab.innerHTML = tab.label = opt_label;
  }

  if (opt_content != undefined) {
    tab.content = opt_content;
  }

  if (this.activeTab_ == tab.tab) {
    this.setContent(tab.content);
    this.updateContent_();
  }
  this.redraw_();
};
InfoBubble.prototype['updateTab'] = InfoBubble.prototype.updateTab;


/**
 * Remove a tab at a specific index
 *
 * @param {number} index The index of the tab to remove.
 */
InfoBubble.prototype.removeTab = function(index) {
  if (!this.tabs_.length || index < 0 || index >= this.tabs_.length) {
    return;
  }

  var tab = this.tabs_[index];
  tab.tab.parentNode.removeChild(tab.tab);

  google.maps.event.removeListener(tab.tab.listener_);

  this.tabs_.splice(index, 1);

  //delete tab;

  for (var i = 0, t; t = this.tabs_[i]; i++) {
    t.tab.index = i;
  }

  if (tab.tab == this.activeTab_) {
    // Removing the current active tab
    if (this.tabs_[index]) {
      // Show the tab to the right
      this.activeTab_ = this.tabs_[index].tab;
    } else if (this.tabs_[index - 1]) {
      // Show a tab to the left
      this.activeTab_ = this.tabs_[index - 1].tab;
    } else {
      // No tabs left to sho
      this.activeTab_ = undefined;
    }

    this.setTabActive_(this.activeTab_);
  }

  this.redraw_();
};
InfoBubble.prototype['removeTab'] = InfoBubble.prototype.removeTab;


/**
 * Get the size of an element
 * @private
 * @param {Node|string} element The element to size.
 * @param {number=} opt_maxWidth Optional max width of the element.
 * @param {number=} opt_maxHeight Optional max height of the element.
 * @return {google.maps.Size} The size of the element.
 */
InfoBubble.prototype.getElementSize_ = function(element, opt_maxWidth,
                                                opt_maxHeight) {
  var sizer = document.createElement('DIV');
  sizer.style['display'] = 'inline';
  sizer.style['position'] = 'absolute';
  sizer.style['visibility'] = 'hidden';

  if (typeof element == 'string') {
    sizer.innerHTML = element;
  } else {
    sizer.appendChild(element.cloneNode(true));
  }

  document.body.appendChild(sizer);
  var size = new google.maps.Size(sizer.offsetWidth, sizer.offsetHeight);

  // If the width is bigger than the max width then set the width and size again
  if (opt_maxWidth && size.width > opt_maxWidth) {
    sizer.style['width'] = this.px(opt_maxWidth);
    size = new google.maps.Size(sizer.offsetWidth, sizer.offsetHeight);
  }

  // If the height is bigger than the max height then set the height and size
  // again
  if (opt_maxHeight && size.height > opt_maxHeight) {
    sizer.style['height'] = this.px(opt_maxHeight);
    size = new google.maps.Size(sizer.offsetWidth, sizer.offsetHeight);
  }

  document.body.removeChild(sizer);
  //delete sizer;
  return size;
};


/**
 * Redraw the InfoBubble
 * @private
 */
InfoBubble.prototype.redraw_ = function() {
  if(!this.bubble){
    this.buildDom_();
  }
  this.figureOutSize_();
  this.positionCloseButton_();
  this.draw();
};

/**
 * Figure out the optimum size of the InfoBubble
 * @private
 */
InfoBubble.prototype.figureOutSize_ = function() {
  var map = this.get('map');

  if (!map) {
    return;
  }

  var padding = this.getPadding_();
  var borderWidth = this.getBorderWidth_();
  var borderRadius = this.getBorderRadius_();
  var arrowSize = this.getArrowSize_();

  var mapDiv = map.getDiv();
  var gutter = arrowSize * 2;
  var mapWidth = mapDiv.offsetWidth - gutter;
  var mapHeight = mapDiv.offsetHeight - gutter - this.getAnchorHeight_();
  var tabHeight = 0;
  var width = /** @type {number} */ (this.get('minWidth') || 0);
  var height = /** @type {number} */ (this.get('minHeight') || 0);
  var maxWidth = /** @type {number} */ (this.get('maxWidth') || 0);
  var maxHeight = /** @type {number} */ (this.get('maxHeight') || 0);

  maxWidth = Math.min(mapWidth, maxWidth);
  maxHeight = Math.min(mapHeight, maxHeight);

  var tabWidth = 0;
  if (this.tabs_.length) {
    // If there are tabs then you need to check the size of each tab's content
    for (var i = 0, tab; tab = this.tabs_[i]; i++) {
      var tabSize = this.getElementSize_(tab.tab, maxWidth, maxHeight);
      var contentSize = this.getElementSize_(tab.content, maxWidth, maxHeight);

      if (width < tabSize.width) {
        width = tabSize.width;
      }

      // Add up all the tab widths because they might end up being wider than
      // the content
      tabWidth += tabSize.width;

      if (height < tabSize.height) {
        height = tabSize.height;
      }

      if (tabSize.height > tabHeight) {
        tabHeight = tabSize.height;
      }

      if (width < contentSize.width) {
        width = contentSize.width;
      }

      if (height < contentSize.height) {
        height = contentSize.height;
      }
    }
  } else {
    var content = /** @type {string|Node} */ (this.get('content'));
    if (typeof content == 'string') {
      content = this.htmlToDocumentFragment_(content);
    }
    if (content) {
      var contentSize = this.getElementSize_(content, maxWidth, maxHeight);

      if (width < contentSize.width) {
        width = contentSize.width;
      }

      if (height < contentSize.height) {
        height = contentSize.height;
      }
    }
  }

  if (maxWidth) {
    width = Math.min(width, maxWidth);
  }

  if (maxHeight) {
    height = Math.min(height, maxHeight);
  }

  width = Math.max(width, tabWidth);

  if (width == tabWidth) {
    width = width + 2 * padding;
  }

  arrowSize = arrowSize * 2;
  width = Math.max(width, arrowSize);

  // Maybe add this as a option so they can go bigger than the map if the user
  // wants
  if (width > mapWidth) {
    width = mapWidth;
  }

  if (height > mapHeight) {
    height = mapHeight - tabHeight;
  }

  if (this.tabsContainer_) {
    this.tabHeight_ = tabHeight;
    this.tabsContainer_.style['width'] = this.px(tabWidth);
  }

  this.contentContainer_.style['width'] = this.px(width);
  this.contentContainer_.style['height'] = this.px(height);
};


/**
 *  Get the height of the anchor
 *
 *  This function is a hack for now and doesn't really work that good, need to
 *  wait for pixelBounds to be correctly exposed.
 *  @private
 *  @return {number} The height of the anchor.
 */
InfoBubble.prototype.getAnchorHeight_ = function() {
  var anchor = this.get('anchor');
  if (anchor) {
    var anchorPoint = /** @type google.maps.Point */ (this.get('anchorPoint'));

    if (anchorPoint) {
      return -1 * anchorPoint.y;
    }
  }
  return 0;
};

InfoBubble.prototype.anchorPoint_changed = function() {
  this.draw();
};
InfoBubble.prototype['anchorPoint_changed'] = InfoBubble.prototype.anchorPoint_changed;


/**
 * Position the close button in the right spot.
 * @private
 */
InfoBubble.prototype.positionCloseButton_ = function() {
  var br = this.getBorderRadius_();
  var bw = this.getBorderWidth_();

  var right = 2;
  var top = 2;

  if (this.tabs_.length && this.tabHeight_) {
    top += this.tabHeight_;
  }

  top += bw;
  right += bw;

  var c = this.contentContainer_;
  if (c && c.clientHeight < c.scrollHeight) {
    // If there are scrollbars then move the cross in so it is not over
    // scrollbar
    right += 15;
  }

  this.close_.style['right'] = this.px(right);
  this.close_.style['top'] = this.px(top);
  }; 
