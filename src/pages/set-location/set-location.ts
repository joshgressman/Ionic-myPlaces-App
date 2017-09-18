import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Location } from '../../models/location';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {

  location: Location;
    marker: Location;
   //accessing navigation object set in params from add-place page
   constructor(private navParams: NavParams, private viewCtrl: ViewController){
     this.location = this.navParams.get('location');
     if(this.navParams.get('isSet')){
     this.marker = this.location;
     }
   }
   //map location will be handled by an Angular package
   //   npm install - - save @agm/core
   onSetMarker(event: any){
     this.marker = new Location(event.coords.lat, event.coords.lng)
     console.log(this.marker);
   }

   //close modal window with marker data.
   onConfirm(){
    this.viewCtrl.dismiss({location: this.marker});
   }

  //close modal window
   onAbort(){
     this.viewCtrl.dismiss();
   }

}
