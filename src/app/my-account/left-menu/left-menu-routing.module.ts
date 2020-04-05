import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeftMenuPage } from './left-menu.page';

const routes: Routes = [
  {
    path: '',
    component: LeftMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeftMenuPageRoutingModule {}
