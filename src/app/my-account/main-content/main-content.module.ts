import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainContentPageRoutingModule } from './main-content-routing.module';

import { MainContentPage } from './main-content.page';
import {HeaderPageModule} from "../../header/header.module";
import {FooterPageModule} from "../../footer/footer.module";
import {LeftMenuPageModule} from "../left-menu/left-menu.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MainContentPageRoutingModule,
        HeaderPageModule,
        FooterPageModule,
        LeftMenuPageModule
    ],
  declarations: [MainContentPage]
})
export class MainContentPageModule {}
