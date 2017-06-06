import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { Angular2TokenService } from '../services/token-service/auth-token.service';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: '',
    component: Pages,
    children: [
      { path: '', redirectTo: '/jobs', pathMatch: 'full' },
      { path: 'jobs', loadChildren: 'app/pages/jobs/jobs.module#JobsModule', canActivate: [Angular2TokenService] },
      { path: 'createJob', loadChildren: 'app/pages/createJob1/createJob.module#CreateJobModule',canActivate: [Angular2TokenService]}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
