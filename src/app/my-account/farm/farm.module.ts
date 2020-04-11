import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmPageRoutingModule } from './farm-routing.module';

import { FarmPage } from './farm.page';
import {FooterPageModule} from "../../footer/footer.module";
import {LeftMenuPageModule} from "../left-menu/left-menu.module";
import {HeaderPageModule} from "../../header/header.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FarmPageRoutingModule,
        FooterPageModule,
        LeftMenuPageModule,
        HeaderPageModule
    ],
  declarations: [FarmPage]
})
export class FarmPageModule {}
