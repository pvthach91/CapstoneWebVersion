import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleManagePage } from './vehicle-manage.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleManagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleManagePageRoutingModule {}
