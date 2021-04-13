import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'track',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'track',
    pathMatch: 'full',
    canActivate: [AuthGuard]
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
    ],
    canActivate: [AuthGuard]

  },
  {
    path: 'auth/registration',
    loadChildren: () => import('./auth/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'auth/login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'track',
    loadChildren: () => import('./track/track.module').then( m => m.TrackPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
