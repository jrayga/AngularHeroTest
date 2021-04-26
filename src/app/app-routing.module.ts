import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page } from '../resources/const/pages';

const routes: Routes = [
  {
    path: '',
    redirectTo: `/${Page.DASHBOARD}`,
    pathMatch: 'full'
  },
  {
    path: Page.DASHBOARD,
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: Page.HOME,
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
