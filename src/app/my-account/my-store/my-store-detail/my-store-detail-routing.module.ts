import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyStoreDetailPage } from './my-store-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MyStoreDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyStoreDetailPageRoutingModule {}
