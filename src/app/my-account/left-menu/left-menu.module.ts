import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeftMenuPageRoutingModule } from './left-menu-routing.module';

import { LeftMenuPage } from './left-menu.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LeftMenuPageRoutingModule
    ],
    exports: [
        LeftMenuPage
    ],
    declarations: [LeftMenuPage]
})
export class LeftMenuPageModule {}
