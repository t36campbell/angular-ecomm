import { Component, OnInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult; 

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  showStores: boolean;
  currentPlace: marker;
  zoom: number;
  radius: number;
  places: marker[] = [
    {
      lat: 40.7060361,
      lng: -74.0088256,
      label: 'A',
    },
    {
      lat: 25.7620955,
      lng: -80.1932258,
      label: 'B',
    },
    {
      lat: 44.9750472,
      lng: -93.2503777,
      label: 'C',
    },
    {
      lat: 32.7793704,
      lng: -96.8008565,
      label: 'D',
    },
    {
      lat: 47.6172481,
      lng: -122.3520857,
      label: 'E',
    },
    {
      lat: 34.1015088,
      lng: -118.333556,
      label: 'F',
    },
  ];
  markers: marker[] = [];

  storeData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])
  ngOnInit() {
    this.showStores = false;
    this.places.forEach(m => { 
      this.markers.push(m);
    });
    this.currentPlace = {
      lat: 39.8283,
      lng: -98.5795,
    };
    this.zoom = 4;
    this.storeData.next([ ...this.places])
  }

  geolocate() {
    if (navigator.geolocation) {
      const options = {
        maximumAge: 60000,
        timeout: 5000,
        enableHighAccuracy: true,
      };
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newMarker = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.markers.push(newMarker);
          this.currentPlace = newMarker;
          this.calculateDistance();
          this.zoom = 12;
          this.radius = 5000;
        },
        (err) => {
          console.log(err);
        },
        options
      );
    }
  };

  public appearance = Appearance;
  public selectedAddress: PlaceResult;
  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  };
 
  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    const newMarker = {
      lat: location.latitude,
      lng: location.longitude
    };
    this.markers.push(newMarker);
    this.currentPlace = newMarker;
    this.calculateDistance();
    this.zoom = 12;
    this.radius = 5000;
  };

  calculateDistance() {
    this.places.forEach(m => {
      const p1 = new google.maps.LatLng(
        this.currentPlace.lat,
        this.currentPlace.lng
      );
      let p2 = new google.maps.LatLng(
        m.lat,
        m.lng
      );
      let calc = google.maps.geometry.spherical.computeDistanceBetween(p1, p2);
      m.distance = Number((calc/1609).toFixed(2)); // meters to miles
    });
    this.storeData.next([ ...this.places])
    this.showStores = true;
  };
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  distance?: number;
}
