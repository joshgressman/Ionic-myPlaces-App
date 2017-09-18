import { Place } from '../models/place';
import { Location } from '../models/location';
import { Injectable } from '@angular/core';
//ionic storage
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';

@Injectable()
export class PlacesService {
 private places: Place[] = [];

 constructor(private storage: Storage, private file: File){}

 addPlace(title: string, description: string, location: Location, imageUrl: string){
 const place = new Place(title, description, location, imageUrl);
 this.places.push(place);
 //using storage by setting key value pairs
 //'places' is the key this.places[] is the value
 this.storage.set('places', this.places)
 .then(
   data => {
     console.log("place saved to storage", this.storage);
   }
 )
 .catch(
   err => {
     this.places.splice(this.places.indexOf(place, 1));
   }
 )
}

loadPlace(){
  return this.places.slice();
}

//fetch places from storage
fetchData(){
  return this.storage.get('places')
  .then(
    (places: Place[]) => {
      this.places = places != null ? places : [];
      return this.places.slice();
    }
  )
  .catch(
    err => {
      console.log(err)
    }
  )
}

deletePlace(index: number){
  const place = this.places[index];
  this.places.splice(index, 1);
  //remove from array in service then update within Storage to update new array
  this.storage.set('places', this.places)
  //removed the saved image within file in .then()
  .then(
    () => {
      //this is set to inactive due to not running with a camera and not saving files
    //  this.removeFile(place);
    }
  )
  .catch(
    err => {
      console.log(err);
    }
  )

}

private removeFile(place: Place){
   const currentName = place.imagePath.replace(/^.*[\\\/]/,'');
   this.file.removeFile(this.file.dataDirectory, currentName)
   .then(
     () => {
       console.log("file removed");
     }
   )
   .catch(
     () => {
       console.log("error while removing file");
       //if removing is not successful add place back to places[]
       this.addPlace(place.title, place.description, place.location, place.imagePath);
     }
   )
}
}
