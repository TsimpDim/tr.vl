import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutesPage } from './routes.page';

const routes: Routes = [
  {
    path: '',
    component: RoutesPage
  },
  {
    path: 'routes-detail',
    loadChildren: () => import('./routes-detail/routes-detail.module').then( m => m.RoutesDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutesPageRoutingModule {}
