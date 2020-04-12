import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import {FooterPageModule} from "../../footer/footer.module";
import {LeftMenuPageModule} from "../left-menu/left-menu.module";
import {HeaderPageModule} from "../../header/header.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChatPageRoutingModule,
        FooterPageModule,
        LeftMenuPageModule,
        HeaderPageModule
    ],
  declarations: [ChatPage]
})
export class ChatPageModule {}
