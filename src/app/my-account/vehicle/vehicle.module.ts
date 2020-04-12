import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiclePageRoutingModule } from './vehicle-routing.module';

import { VehiclePage } from './vehicle.page';
import {FooterPageModule} from "../../footer/footer.module";
import {LeftMenuPageModule} from "../left-menu/left-menu.module";
import {HeaderPageModule} from "../../header/header.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehiclePageRoutingModule,
    FooterPageModule,
    LeftMenuPageModule,
    HeaderPageModule
  ],
  declarations: [VehiclePage]
})
export class VehiclePageModule {}
