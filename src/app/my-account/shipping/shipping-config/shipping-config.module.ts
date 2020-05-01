import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShippingConfigPageRoutingModule } from './shipping-config-routing.module';

import { ShippingConfigPage } from './shipping-config.page';
import {FooterPageModule} from "../../../footer/footer.module";
import {HeaderPageModule} from "../../../header/header.module";
import {LeftMenuPageModule} from "../../left-menu/left-menu.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ShippingConfigPageRoutingModule,
        FooterPageModule,
        HeaderPageModule,
        LeftMenuPageModule
    ],
  declarations: [ShippingConfigPage]
})
export class ShippingConfigPageModule {}
