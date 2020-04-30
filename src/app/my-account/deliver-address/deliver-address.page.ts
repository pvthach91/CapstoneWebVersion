import {Component, OnInit} from '@angular/core';
import {AddressService} from "../../services/address.service";
import {ActivatedRoute} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {Address} from "../../model/address.model";

@Component({
  selector: 'app-deliver-address',
  templateUrl: './deliver-address.page.html',
  styleUrls: ['./deliver-address.page.scss'],
})
export class DeliverAddressPage implements OnInit {

  addresses: Array<Address> = new Array<Address>();

  constructor(private route: ActivatedRoute,
              private addressService: AddressService,
              public alertController: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getAddresses();
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

  getAddresses() {
    this.addressService.getAddressesForCurrentUser().subscribe(
        data => {
          if (data != null) {
            this.addresses = data;
          } else {
            this.presentAlert('Error', '', 'Failed to get address');
          }
        },
        error => {
          this.presentAlert('Error', '', 'Failed to get address');
        }
    );
  }

}
