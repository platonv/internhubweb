import { Routes, RouterModule }  from '@angular/router';
import { CreateJobComponent } from './createJob.component';

const routes: Routes = [
  {
    path: '',
    component: CreateJobComponent
  }
];

export const routing = RouterModule.forChild(routes);