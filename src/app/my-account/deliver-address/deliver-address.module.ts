import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliverAddressPageRoutingModule } from './deliver-address-routing.module';

import { DeliverAddressPage } from './deliver-address.page';
import {FooterPageModule} from "../../footer/footer.module";
import {HeaderPageModule} from "../../header/header.module";
import {LeftMenuPageModule} from "../left-menu/left-menu.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DeliverAddressPageRoutingModule,
        FooterPageModule,
        HeaderPageModule,
        LeftMenuPageModule
    ],
  declarations: [DeliverAddressPage]
})
export class DeliverAddressPageModule {}
