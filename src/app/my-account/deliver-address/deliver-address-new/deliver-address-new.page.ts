import {AddressService} from "../../../services/address.service";
import {Component, OnInit} from '@angular/core';
import {State} from "../../../model/state.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigurationStorage} from "../../../services/configuration-storage.service";
import {AlertController} from "@ionic/angular";
import {Address} from "../../../model/address.model";

declare const google: any;

@Component({
  selector: 'app-deliver-address-new',
  templateUrl: './deliver-address-new.page.html',
  styleUrls: ['./deliver-address-new.page.scss'],
})
export class DeliverAddressNewPage implements OnInit {

  form: any = {};
  id;
  states: Array<State> =new Array<State>();
  address: Address = new Address(null, '', '', '', 0, 0);

  lat;
  lng;
  marker;
  map;
  draggable = true;

  constructor(private route: ActivatedRoute,
              private addressService: AddressService,
              private router: Router,
              private configurationStorage: ConfigurationStorage,
              public alertController: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.states = this.configurationStorage.getStateList();
      this.id = params['id'];
      if (this.id == null || this.id == undefined) {
        this.form.state = this.states[0].name;
        this.getCurrentLocation();
      } else {
        this.getCurrentAddress();
      }
    });
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  getCurrentAddress() {
    this.addressService.getFarm(this.id).subscribe(
        data => {
          if (data.success) {
            this.address = data.data;
            this.lat = this.address.latitude;
            this.lng = this.address.longitude;
            this.form.id = this.address.id;
            this.form.state = this.address.state;
            this.form.address = this.address.address;
            this.form.name = this.address.name;

            this.draggable = false;
            this.initMap();
          } else {
            this.presentAlert('Failed', '', 'Failed to get address');
          }
        },
        error => {
        }
    );
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      let current = this;
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log('show location: ' + position.coords.latitude);
        current.lat =position.coords.latitude;
        current.lng =position.coords.longitude;
        current.draggable = true;
        current.initMap();
      }, function() {
      });
    } else {
      console.log('Browser doesnt support Geolocation');
    }
  }

  initMap() {
    var mapOptions = {
      center:new google.maps.LatLng(this.lat, this.lng),
      zoom:15
    };


    this.map = new google.maps.Map(document.getElementById("address-location-map"),mapOptions);
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.lat, this.lng),
      draggable:this.draggable,
      map: this.map,
    });
  }

  onSubmit() {
    let adress = new Address(this.form.id, this.form.name, this.form.state, this.form.address, this.marker.position.lat(), this.marker.position.lng());
    this.addressService.addAddress(adress).subscribe(
        data => {
          if (data.success) {
            this.router.navigate(['/my-account/deliver-address']);
            this.configurationStorage.deliveryAddressLatest = false;
          } else {
            this.presentAlert('Error', '', 'Failed to update address');
          }
        },
        error => {
          this.presentAlert('Error', '', 'Failed to create address');
        }
    );
  }

}
