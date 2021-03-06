import {Component} from '@angular/core'
import {MapsPage} from '../maps/maps';
import {DirectoryPage} from '../directory/directory';
import {ContactPage} from '../contact/contact';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = MapsPage;
    this.tab2Root = DirectoryPage;
    this.tab3Root = ContactPage;
  }
}
