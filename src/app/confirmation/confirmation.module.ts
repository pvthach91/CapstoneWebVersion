import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmationPageRoutingModule } from './confirmation-routing.module';

import { ConfirmationPage } from './confirmation.page';
import {FooterPageModule} from "../footer/footer.module";
import {HeaderPageModule} from "../header/header.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ConfirmationPageRoutingModule,
        FooterPageModule,
        HeaderPageModule
    ],
  declarations: [ConfirmationPage]
})
export class ConfirmationPageModule {}
