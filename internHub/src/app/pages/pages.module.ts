import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';
import { ViewApplicationsComponent } from './view-applications/view-applications.component';
import { ViewApplicationsService } from './view-applications/view-applications.service.ts';

import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule, routing, Ng2SmartTableModule],
  declarations: [Pages, ViewApplicationsComponent],
  providers: [ViewApplicationsService]
})
export class PagesModule {
}
