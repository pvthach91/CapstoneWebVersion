import {Component, OnInit} from '@angular/core';
import {AlertController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {ShippingConfig} from "../../model/shipping-config.model";
import {ShippingConfigService} from "../../services/shipping-config.service";
import {ConfigurationStorage} from "../../services/configuration-storage.service";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
})
export class ShippingPage implements OnInit {

  shippings: Array<ShippingConfig> = new Array<ShippingConfig>();

  constructor(private shippingService: ShippingConfigService,
              public alertController: AlertController,
              public configurationStorage: ConfigurationStorage,
              public router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getShippingConfigs();
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

  getShippingConfigs() {
    this.shippingService.getShippingConfigs().subscribe(
        data => {
          this.shippings = data;
          if (!this.configurationStorage.shippingConfigLatest) {
            this.configurationStorage.saveShippingConfigs(this.shippings);
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  async deleteShippingConfig(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure to delete the shipping config?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.shippingService.deleteShippingConfig(id).subscribe(
                data => {
                  if (data.success) {
                    this.router.navigateByUrl('/my-account/shipping-config');
                  } else {
                    this.presentAlert('Failed', '', data.message);
                  }
                },
                error => {
                  this.presentAlert('Failed', '', 'Failed to deactivate the user');
                }
            );
          }
        }
      ]
    });

    await alert.present();
  }

}
