import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BodPageRoutingModule } from './bod-routing.module';

import { BodPage } from './bod.page';
import {HeaderPageModule} from "../header/header.module";
import {FooterPageModule} from "../footer/footer.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BodPageRoutingModule,
        HeaderPageModule,
        FooterPageModule
    ],
  declarations: [BodPage]
})
export class BodPageModule {}
