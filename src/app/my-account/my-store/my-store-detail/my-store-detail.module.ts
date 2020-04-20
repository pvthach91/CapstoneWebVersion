import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyStoreDetailPageRoutingModule } from './my-store-detail-routing.module';

import { MyStoreDetailPage } from './my-store-detail.page';
import {FooterPageModule} from "../../../footer/footer.module";
import {HeaderPageModule} from "../../../header/header.module";
import {LeftMenuPageModule} from "../../left-menu/left-menu.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyStoreDetailPageRoutingModule,
    FooterPageModule,
    HeaderPageModule,
    LeftMenuPageModule
  ],
  declarations: [MyStoreDetailPage]
})
export class MyStoreDetailPageModule {}
