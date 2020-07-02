import { Component, NgZone } from '@angular/core';
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent {
  lat: number;
  lng: number;
  zoom: number;
  radius: number; 
  address: Object;
  formattedAddress: string;
  markers: marker[] = [
	  {
      lat: 40.7060361, 
      lng: -74.0088256,
      label: 'A'
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
	  }
  ];

  constructor(public zone: NgZone) { }

  getAddress(place: object) {
    this.address = place['formatted_address'];
    this.formattedAddress = place['formatted_address'];
    this.zone.run(() => this.formattedAddress = place['formatted_address']);
  }

  geolocate() {
    if (navigator.geolocation) {
      const options = {
        maximumAge: 60000,
        timeout: 5000,
        enableHighAccuracy: true
      }
      navigator.geolocation.getCurrentPosition(
        position => {
          const newMarker = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          this.lat = newMarker.lat;
          this.lng = newMarker.lng;
          this.markers.push(newMarker);
          this.zoom = 12;
        },
        err => {
          console.log(err)
        },
        options
      )
    };
  };
};
interface marker {
  lat: number;
  lng: number;
  label?: string;
};