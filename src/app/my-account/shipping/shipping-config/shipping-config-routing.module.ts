import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShippingConfigPage } from './shipping-config.page';

const routes: Routes = [
  {
    path: '',
    component: ShippingConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShippingConfigPageRoutingModule {}
