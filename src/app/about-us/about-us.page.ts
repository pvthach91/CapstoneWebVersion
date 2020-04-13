declare const google: any;
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  title: string = 'Contact Us';
  lat: number = 14.6777161;
  lng: number = 121.036953;
  zoom: number = 13;

  map;

  address = 'Sydney, NSW';

  constructor() { }

  ngOnInit() {
    var mapOptions = {
      center:new google.maps.LatLng(14.665393, 121.012528),
      zoom:15
    }

    this.map = new google.maps.Map(document.getElementById("contact-us-location-map"),mapOptions);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(14.665393, 121.012528),
      // draggable:true,
      map: this.map,
    });

    // marker.addListener('click', () => {
    //   console.log(marker.position.lat());
    //   console.log(marker.position.lng());
    // });
  }

  search() {
    var geocoder = new google.maps.Geocoder();
    this.geocodeAddress(geocoder, this.map);

  }

  geocodeAddress(geocoder, resultsMap) {
    // var address = document.getElementById('address').value;
    geocoder.geocode({'address': this.address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }


}
