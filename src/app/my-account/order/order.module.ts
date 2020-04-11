import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';

import { OrderPage } from './order.page';
import {FooterPageModule} from "../../footer/footer.module";
import {HeaderPageModule} from "../../header/header.module";
import {LeftMenuPageModule} from "../left-menu/left-menu.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        OrderPageRoutingModule,
        FooterPageModule,
        HeaderPageModule,
        LeftMenuPageModule
    ],
  declarations: [OrderPage]
})
export class OrderPageModule {}
