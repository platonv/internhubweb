import { Routes, RouterModule }  from '@angular/router';

import { CreateJob } from './createJob.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: CreateJob
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
