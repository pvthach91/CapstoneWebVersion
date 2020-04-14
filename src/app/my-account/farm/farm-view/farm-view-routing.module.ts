import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmViewPage } from './farm-view.page';

const routes: Routes = [
  {
    path: '',
    component: FarmViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmViewPageRoutingModule {}
