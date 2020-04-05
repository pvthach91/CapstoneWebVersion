import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import {HeaderPageModule} from "../header/header.module";
import {FooterPageModule} from "../footer/footer.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CartPageRoutingModule,
        HeaderPageModule,
        FooterPageModule
    ],
  declarations: [CartPage]
})
export class CartPageModule {}
