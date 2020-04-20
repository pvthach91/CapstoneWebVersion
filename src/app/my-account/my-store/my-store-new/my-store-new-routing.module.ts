import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyStoreNewPage } from './my-store-new.page';

const routes: Routes = [
  {
    path: '',
    component: MyStoreNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyStoreNewPageRoutingModule {}
