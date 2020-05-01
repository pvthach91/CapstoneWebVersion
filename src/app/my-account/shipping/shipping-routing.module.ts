import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShippingPage } from './shipping.page';

const routes: Routes = [
  {
    path: '',
    component: ShippingPage
  },
  {
    path: 'new',
    loadChildren: () => import('./shipping-config/shipping-config.module').then( m => m.ShippingConfigPageModule)
  },
  {
    path: 'view/:id',
    loadChildren: () => import('./shipping-config/shipping-config.module').then( m => m.ShippingConfigPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShippingPageRoutingModule {}
