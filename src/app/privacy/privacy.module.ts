import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacyPageRoutingModule } from './privacy-routing.module';

import { PrivacyPage } from './privacy.page';
import {HeaderPageModule} from "../header/header.module";
import {FooterPageModule} from "../footer/footer.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PrivacyPageRoutingModule,
        HeaderPageModule,
        FooterPageModule
    ],
  declarations: [PrivacyPage]
})
export class PrivacyPageModule {}
