import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'routes',
    children: [
      {
        path: '',
        loadChildren: () => import('./routes/routes.module').then( m => m.RoutesPageModule)
      },
      {
        path: ':routeId',
        loadChildren: () => import('./routes/routes-detail/routes-detail.module').then( m => m.RoutesDetailPageModule)
      }
    ]

  },
  {
    path: 'auth/registration',
    loadChildren: () => import('./auth/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'auth/login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
