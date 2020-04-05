import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainContentPage } from './main-content.page';

const routes: Routes = [
  {
    path: '',
    component: MainContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainContentPageRoutingModule {}
