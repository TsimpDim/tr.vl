import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutesDetailPage } from './routes-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RoutesDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutesDetailPageRoutingModule {}
