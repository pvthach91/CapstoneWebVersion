import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import {FooterPageModule} from "../../footer/footer.module";
import {LeftMenuPageModule} from "../left-menu/left-menu.module";
import {HeaderPageModule} from "../../header/header.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserPageRoutingModule,
        FooterPageModule,
        LeftMenuPageModule,
        HeaderPageModule
    ],
  declarations: [UserPage]
})
export class UserPageModule {}
