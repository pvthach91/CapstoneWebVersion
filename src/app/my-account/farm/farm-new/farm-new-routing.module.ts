import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmNewPage } from './farm-new.page';

const routes: Routes = [
  {
    path: '',
    component: FarmNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmNewPageRoutingModule {}
