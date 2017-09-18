import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place'
import { Place } from '../../models/place';
import { PlacesService } from '../../services/places';
import { PlacePage } from '../place/place';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  addPlacePage = AddPlacePage;
  places: Place[] = [];

  constructor(public modalCtrl: ModalController, private placesService: PlacesService) {

  }

  ionViewWillEnter(){
    this.places = this.placesService.loadPlace();
  }

  //will open the place page in a modal with the idevidual place data passed within the object
  //index is also passed in the method to remove a place
  onOpenPlace(place: Place, index: number){
   const modal = this.modalCtrl.create(PlacePage, {place: place, index: index});
   modal.present();
  }

  ngOnInit(){
    this.placesService.fetchData()
    .then(
      (places: Place[]) => {
        this.places = places;
      });
  }

}
