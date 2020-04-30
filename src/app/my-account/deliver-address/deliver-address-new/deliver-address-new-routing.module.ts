import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliverAddressNewPage } from './deliver-address-new.page';

const routes: Routes = [
  {
    path: '',
    component: DeliverAddressNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliverAddressNewPageRoutingModule {}
