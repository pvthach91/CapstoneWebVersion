import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliverAddressNewPageRoutingModule } from './deliver-address-new-routing.module';

import { DeliverAddressNewPage } from './deliver-address-new.page';
import {FooterPageModule} from "../../../footer/footer.module";
import {HeaderPageModule} from "../../../header/header.module";
import {LeftMenuPageModule} from "../../left-menu/left-menu.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DeliverAddressNewPageRoutingModule,
        FooterPageModule,
        HeaderPageModule,
        LeftMenuPageModule
    ],
  declarations: [DeliverAddressNewPage]
})
export class DeliverAddressNewPageModule {}
