import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusStopNameResolverService } from './../services/resolvers/bus-stop-name-resolver.service';
import { ProprietorGuard } from './../guards/proprietor.guard';
import { AdminGuard } from './../guards/admin.guard';
import { LoggedInGuard } from './../guards/logged-in.guard';
import { NotFoundComponent } from '../app-common/components/not-found/not-found.component';
import { ServerErrorComponent } from '../app-common/components/server-error/server-error.component';

const routes: Routes = [

  {
    path: 'search',
    resolve: {busStops: BusStopNameResolverService},
    loadChildren: () => import('../app-search/app-search.module').then(module => module.AppSearchModule)
  },

  {
    path: 'auth',
    loadChildren: () => import('../app-unLoggedIn-user/app-unLoggedIn-user.module').then(module => module.AppUnLoggedInUserModule)
  },

  {
    path: 'user',
    canActivate: [LoggedInGuard],
    loadChildren: () => import('../app-loggedIn-user/app-loggedIn-user.module').then(module => module.AppLoggedInUserModule)
  },

  {
    path: 'admin',
    canActivate: [LoggedInGuard, AdminGuard],
    loadChildren: () => import('../app-admin/app-admin.module').then(module => module.AppAdminModule)
  },

  {
    path: 'proprietor',
    canActivate: [LoggedInGuard, ProprietorGuard],
    loadChildren: () => import('../app-proprietor/app-proprietor.module').then(module => module.AppProprietorModule)
  },

  {path: 'server-error', component: ServerErrorComponent},
  {path: '', redirectTo: '/search', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
