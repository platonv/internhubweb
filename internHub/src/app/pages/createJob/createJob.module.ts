import { NgModule }     from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CreateJobComponent } from './createJob.component';
import{ CreateJobFormFieldComponent} from './createJobFormField/createJobFormField.component'

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        CreateJobFormFieldComponent,
        CreateJobComponent,
    ],
    exports: [
        CreateJobComponent,
    ]
})
export class CreateJobSharedModule { }