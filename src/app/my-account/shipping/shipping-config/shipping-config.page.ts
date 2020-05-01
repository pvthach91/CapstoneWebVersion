import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigurationStorage} from "../../../services/configuration-storage.service";
import {State} from "../../../model/state.model";
import {ShippingConfig} from "../../../model/shipping-config.model";
import {ShippingConfigService} from "../../../services/shipping-config.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-shipping-config',
  templateUrl: './shipping-config.page.html',
  styleUrls: ['./shipping-config.page.scss'],
})
export class ShippingConfigPage implements OnInit {

  form: any = {};
  isNewAction = true;
  id;
  shipping: ShippingConfig = new ShippingConfig(null, '', 0, 0, 0);

  states:Array<State> = new Array<State>();

  constructor(private shippingConfigService: ShippingConfigService,
              private route: ActivatedRoute,
              public alertController: AlertController,
              private configurationStorage: ConfigurationStorage,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.states = this.configurationStorage.getStateList();
      this.states.push(new State(0, 'Otherwise'));
      if (this.id == null || this.id == undefined) {
        // Load new page
        this.isNewAction = true;
        this.form.state = this.states[0].name;
      } else {
        // Load detail page
        this.isNewAction = false;
        this.getVehicle();
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

  getVehicle() {
    this.shippingConfigService.getShippingConfig(this.id).subscribe(
        data => {
          if (data.success) {
            this.shipping = data.data;
            this.initData();
          } else {
            console.log('Failed to get vehicle');
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  initData() : void {
    if (!this.isNewAction) {
      this.form.id = this.shipping.id;
      this.form.state = this.shipping.state;
      this.form.price = this.shipping.price;
      this.form.weightCarryTo = this.shipping.weightCarryTo;
      this.form.weightCarryFrom = this.shipping.weightCarryFrom;
    }
  }

  onSubmit() {
    let sc = new ShippingConfig(this.form.id,
        this.form.state,
        this.form.price,
        this.form.weightCarryTo,
        this.form.weightCarryFrom);
    this.shippingConfigService.addShippingConfig(sc).subscribe(
        data => {
          this.router.navigateByUrl('my-account/shipping-config');
        },
        error => {
          this.presentAlert('Failed', '', JSON.stringify(error));
        }
    );
  }

}
