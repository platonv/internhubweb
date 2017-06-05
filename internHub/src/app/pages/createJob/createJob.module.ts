import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Angular2TokenService } from '../../services/token-service/auth-token.service';
import {
    CreateJobSharedModule
} from './createJobForm/createJobForm.module';

import{ CreateJobComponent } from './createJob.component'
import {routing} from './createJob.routing'

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CreateJobSharedModule,
        routing
    ],
    declarations: [
        CreateJobComponent
    ]
})
export class CreateJobModule { }