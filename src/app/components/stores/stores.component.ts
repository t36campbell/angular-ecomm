import { Component, OnInit } from '@angular/core';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  currentPlace: marker;
  zoom: number;
  radius: number;
  markers: marker[] = [
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
  origin: any;
  destination: any;
  distance: any;

  ngOnInit() {
    this.currentPlace = {
      lat: 39.8283,
      lng: -98.5795,
    };
    this.zoom = 4;
    this.origin = {
      lat: 24.799448,
      lng: 120.979021,
    };
    this.destination = {
      lat: 24.799524,
      lng: 120.975017,
    };
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
          this.currentPlace = newMarker;
          this.markers.push(newMarker);
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
  }
 
  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    const newMarker = {
      lat: location.latitude,
      lng: location.longitude
    };
    this.currentPlace = newMarker;
    this.markers.push(newMarker);
    this.zoom = 12;
    this.radius = 5000;
  }
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
}
