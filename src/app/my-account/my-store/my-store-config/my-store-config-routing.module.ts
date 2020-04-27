import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyStoreConfigPage } from './my-store-config.page';

const routes: Routes = [
  {
    path: '',
    component: MyStoreConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyStoreConfigPageRoutingModule {}
