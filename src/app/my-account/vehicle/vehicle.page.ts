import { Component, OnInit } from '@angular/core';
import {FarmerService} from "../../services/farmer.service";
import {Vehicle} from "../../model/vehicle.model";
import {ActivatedRoute} from "@angular/router";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.page.html',
  styleUrls: ['./vehicle.page.scss'],
})
export class VehiclePage implements OnInit {

  vehicles: Array<Vehicle> = new Array<Vehicle>();

  constructor(private farmerService: FarmerService,
              public alertController: AlertController,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getVehicles();
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

  getVehicles() {
    this.farmerService.getVehiclesForCurrentUser().subscribe(
        data => {
          this.vehicles = data;
        },
        error => {
          console.log(error);
        }
    );
  }

  async deleteVehicle(id: number) {
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: 'Are you sure to delete the vehicle?',
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
          this.farmerService.deleteVehicle(id).subscribe(
              data => {
                if (data.success) {
                  this.getVehicles();
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
