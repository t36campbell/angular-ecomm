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
  showCircle: boolean;
  currentPlace: marker;
  zoom: number;
  radius: number;
  options: any[] = [
    {value: 160935, viewValue: '100'},
    {value: 804672, viewValue: '500'},
    {value: 1609344, viewValue: '1000'}
  ];
  places: marker[] = [
    {
      title: "New York, NY",
      label: 'A',
      lat: 40.7060361,
      lng: -74.0088256,
      address: "1234 Wall Street",
      distance: 0,
    },
    {
      title: "Maimi, FL",
      label: 'B',
      lat: 25.7620955,
      lng: -80.1932258,
      address: "1234 S.Miami Avenue",
      distance: 1,
    },
    {
      title: "Dallas, TX",
      label: 'C',
      lat: 32.7793704,
      lng: -96.8008565,
      address: "1234 Commerce Street",
      distance: 2,
    },
    {
      title: "Minneapolis, MN",
      label: 'D',
      lat: 44.9750472,
      lng: -93.2503777,
      address: "1234 S Washington Ave",
      distance: 3,
    },
    {
      title: "Seattle, WA",
      label: 'E',
      lat: 47.6172481,
      lng: -122.3520857,
      address: "1234 Broad Street",
      distance: 4,
    },
    {
      title: "Los Angeles, CA",
      label: 'F',
      lat: 34.1015088,
      lng: -118.333556,
      address: "1234 Hollywood Boulevard",
      distance: 5,
    },
  ];
  markers: marker[] = [];

  storeData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])
  ngOnInit() {
    this.showStores = false;
    this.showCircle = false;
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
  title?: string;
  label?: string;
  lat: number;
  lng: number;
  address?: string;
  distance?: number;
}
