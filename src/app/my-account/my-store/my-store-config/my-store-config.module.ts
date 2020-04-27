import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyStoreConfigPageRoutingModule } from './my-store-config-routing.module';

import { MyStoreConfigPage } from './my-store-config.page';
import {FooterPageModule} from "../../../footer/footer.module";
import {HeaderPageModule} from "../../../header/header.module";
import {LeftMenuPageModule} from "../../left-menu/left-menu.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MyStoreConfigPageRoutingModule,
        FooterPageModule,
        HeaderPageModule,
        LeftMenuPageModule
    ],
  declarations: [MyStoreConfigPage]
})
export class MyStoreConfigPageModule {}
