import { Component, OnInit } from '@angular/core';
import {ViewController, NavParams}  from 'ionic-angular';
import {AppProvider} from '../../providers/wp-api/app-provider';
import {Location} from '../../providers/wp-api/data-clases';
import {Observable} from 'rxjs/Observable';

@Component({
    templateUrl: 'build/pages/directory/location.html'
})
export class LocationPopover implements OnInit {
    provider: AppProvider;
    locations: Array<Location>;
    constructor(private view: ViewController, private params: NavParams) { }

    ngOnInit() { 
        this.provider = this.params.get('provider');
        this.provider.locations.subscribe((data) => this.locations = data); 
    }

    search(location:Location){
        this.provider.getItems(undefined,undefined,undefined,undefined,location._id);
        this.view.dismiss();
    }

}