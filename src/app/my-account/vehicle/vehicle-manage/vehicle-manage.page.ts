import { Component, OnInit } from '@angular/core';
import {FarmerService} from "../../../services/farmer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Vehicle} from "../../../model/vehicle.model";

@Component({
  selector: 'app-vehicle-manage',
  templateUrl: './vehicle-manage.page.html',
  styleUrls: ['./vehicle-manage.page.scss'],
})
export class VehicleManagePage implements OnInit {

  form: any = {};
  isNewAction = true;
  id;
  vehicle: Vehicle = new Vehicle(null, '', '', 0, 0);

  constructor(private farmerService: FarmerService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == null || this.id == undefined) {
        // Load new page
        this.isNewAction = true;
      } else {
        // Load detail page
        this.isNewAction = false;
        this.getVehicle();
      }
    });
  }

  getVehicle() {
    this.farmerService.getVehicle(this.id).subscribe(
        data => {
          if (data.success) {
            this.vehicle = data.data;
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
      this.form.id = this.vehicle.id;
      this.form.name = this.vehicle.name;
      this.form.photo = this.vehicle.photo;
      this.form.pricePerKm = this.vehicle.pricePerKm;
      this.form.weightCarry = this.vehicle.weightCarry;
    }
  }

  onSubmit() {
    let vehicle = new Vehicle(this.form.id,
        this.form.name,
        '',
        this.form.pricePerKm,
        this.form.weightCarry);
    this.farmerService.addVehicle(vehicle).subscribe(
        data => {
          this.router.navigateByUrl('my-account/vehicle');
        },
        error => {
          console.log(error);
        }
    );
  }

}
