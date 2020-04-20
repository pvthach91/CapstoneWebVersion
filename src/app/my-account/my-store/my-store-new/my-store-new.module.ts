import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyStoreNewPageRoutingModule } from './my-store-new-routing.module';

import { MyStoreNewPage } from './my-store-new.page';
import {FooterPageModule} from "../../../footer/footer.module";
import {HeaderPageModule} from "../../../header/header.module";
import {LeftMenuPageModule} from "../../left-menu/left-menu.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyStoreNewPageRoutingModule,
    FooterPageModule,
    HeaderPageModule,
    LeftMenuPageModule
  ],
  declarations: [MyStoreNewPage]
})
export class MyStoreNewPageModule {}
