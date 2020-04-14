import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmViewPageRoutingModule } from './farm-view-routing.module';

import { FarmViewPage } from './farm-view.page';
import {FooterPageModule} from "../../../footer/footer.module";
import {HeaderPageModule} from "../../../header/header.module";
import {LeftMenuPageModule} from "../../left-menu/left-menu.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FarmViewPageRoutingModule,
        FooterPageModule,
        HeaderPageModule,
        LeftMenuPageModule
    ],
  declarations: [FarmViewPage]
})
export class FarmViewPageModule {}
