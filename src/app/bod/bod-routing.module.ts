import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodPage } from './bod.page';

const routes: Routes = [
  {
    path: '',
    component: BodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodPageRoutingModule {}
