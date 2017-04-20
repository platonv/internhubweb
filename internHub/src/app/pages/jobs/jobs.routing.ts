import { Routes, RouterModule }  from '@angular/router';
import { JobsComponent } from './jobs.component';

const routes: Routes = [
  {
    path: '',
    component: JobsComponent
  }
];

export const routing = RouterModule.forChild(routes);