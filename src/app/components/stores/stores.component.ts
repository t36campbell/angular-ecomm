import { Component, OnInit, ViewChild, ElementRef, NgZone, } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  markers: marker[] = [
	  {
      lat: 40.7060361, 
      lng: -74.0088256,
		  label: 'A',
		  draggable: false
	  },
	  {
      lat: 25.7620955, 
      lng: -80.1932258,
		  label: 'B',
		  draggable: false
	  },
	  {
      lat: 44.9750472, 
      lng: -93.2503777,
		  label: 'C',
		  draggable: false
    },
    {
      lat: 32.7793704, 
      lng: -96.8008565,
		  label: 'D',
		  draggable: false
	  },
	  {
      lat: 47.6172481, 
      lng: -122.3520857,
		  label: 'E',
		  draggable: false
	  },
	  {
      lat: 34.1015088, 
      lng: -118.333556,
		  label: 'F',
		  draggable: false
	  }
  ]

  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }


  ngOnInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
        this.markers.push({
          lat: this.latitude,
          lng: this.longitude,
          draggable: false
        });
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}