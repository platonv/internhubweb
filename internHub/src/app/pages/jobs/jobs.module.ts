import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './jobs.routing';


import { JobsComponent } from './jobs.component';
import { Angular2TokenService } from '../../services/token-service/auth-token.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    JobsComponent
  ],
  providers: [
    Angular2TokenService
  ],
})
export class JobsModule { }

