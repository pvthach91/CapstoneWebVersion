import {Component, OnInit} from '@angular/core';
import {AlertController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {ShippingConfig} from "../../model/shipping-config.model";
import {ShippingConfigService} from "../../services/shipping-config.service";
import {ConfigurationStorage} from "../../services/configuration-storage.service";
import {configuration} from "../../model/configuration.model";
import {ShippingConfigCriteriaSearch} from "../../model/shipping-config-criteria-search.model";
import {State} from "../../model/state.model";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
})
export class ShippingPage implements OnInit {

  shippings: Array<ShippingConfig> = new Array<ShippingConfig>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  form: any = {};
  states:Array<State> = new Array<State>();

  constructor(private shippingService: ShippingConfigService,
              public alertController: AlertController,
              public configurationStorage: ConfigurationStorage,
              public router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.states = this.configurationStorage.getStateList();
      this.states.push(new State(0, 'Otherwise'));
      this.form.state = "";
      this.search(1);
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

  onSubmit() {
    this.search(1);
  }

  search(page: number) {
    let sc: ShippingConfigCriteriaSearch = new ShippingConfigCriteriaSearch(this.form.state, page, configuration.pageSize);
    this.shippingService.getShippingConfigs(sc).subscribe(
        data => {
          this.shippings = data.data;
          this.currentPage = data.current;
          this.totalPage = data.total;
          this.makePages();
          if (!this.configurationStorage.shippingConfigLatest) {
            this.configurationStorage.saveShippingConfigs(this.shippings);
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  makePages() {
    this.pages = new Array<number>();
    if (this.totalPage < 1) {
      // do nothing
    } else {
      for (var i = 1; i <= this.totalPage; i++) {
        this.pages.push(i);
      }
    }
  }

  gotoPage(page: number) {
    if(page <1) {
      page = 1;
    }
    this.search(page);
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
