import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { CreateJob } from './createJob.component';
import { CreateJobService } from './createJob.service';
import { routing }       from './createJob.routing';

import { Angular2TokenService } from '../../services/token-service/auth-token.service';


@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    CreateJob
  ],
  providers: [
    CreateJobService,
    Angular2TokenService
  ]
})
export class CreateJobModule {}
