import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../../../services/admin.service";
import {User} from "../../../model/user.model";
import {AlertController} from "@ionic/angular";
import {State} from "../../../model/state.model";
import {ConfigurationStorage} from "../../../services/configuration-storage.service";

declare const google: any;

@Component({
  selector: 'app-my-store-config',
  templateUrl: './my-store-config.page.html',
  styleUrls: ['./my-store-config.page.scss'],
})
export class MyStoreConfigPage implements OnInit {

  form: any = {};
  states: Array<State> =new Array<State>();

  lat;
  lng;
  marker;
  map;
  user: User;
  draggable = false;

  constructor(private route: ActivatedRoute,
              private adminService: AdminService,
              private router: Router,
              private configurationStorage: ConfigurationStorage,
              public alertController: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.states = this.configurationStorage.getStateList();
      this.form.state = this.states[0].name;
      this.getCurrentLocation();
      this.getCurrentUser();
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

  getCurrentUser() {
    this.adminService.getCurrentUser().subscribe(
        data => {
          this.user = data;
          this.form.address = this.user.address;
          this.form.state = this.user.state;
          console.log('user');
          if (this.user.latitude != null && this.user.latitude != undefined && this.user.latitude != 0 &&
              this.user.longitude != null && this.user.longitude != undefined && this.user.longitude != 0) {
            this.lat = this.user.latitude;
            this.lng = this.user.longitude;
            this.draggable = false;
            console.log('lat lng already saved');
          } else {
            this.draggable = true;
          }
          this.initMap();
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
        // current.initMap();
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


    this.map = new google.maps.Map(document.getElementById("my-store-config-location-map"),mapOptions);
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.lat, this.lng),
      draggable:this.draggable,
      map: this.map,
    });
  }

  onSubmit() {
    let userRequest = this.user;
    userRequest.latitude = this.marker.position.lat();
    userRequest.longitude = this.marker.position.lng();
    userRequest.address = this.form.address;
    userRequest.state = this.form.state;
    this.adminService.updateAddress(userRequest).subscribe(
        data => {
          if (data != null) {
            this.router.navigate(['/my-account/my-store']);
          } else {
            this.presentAlert('Error', '', 'Failed to update store address');
          }
        },
        error => {
          this.presentAlert('Error', '', 'Failed to create farm');
        }
    );
  }

}
