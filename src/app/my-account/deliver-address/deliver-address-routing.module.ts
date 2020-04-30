import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliverAddressPage } from './deliver-address.page';

const routes: Routes = [
  {
    path: '',
    component: DeliverAddressPage
  },
  {
    path: 'new',
    loadChildren: () => import('./deliver-address-new/deliver-address-new.module').then( m => m.DeliverAddressNewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliverAddressPageRoutingModule {}
