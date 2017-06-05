import { NgModule }     from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CreateJobFormComponent } from './createJobForm.component';
import{ CreateJobFormFieldComponent} from './createJobFormField/createJobFormField.component'
import{ CreateJobErrorComponent } from './createJobHeadline/createJobError.component'
import{ CreateJobHeadlineComponent } from './createJobHeadline/createJobHeadline.component'


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        CreateJobFormComponent,
        CreateJobFormFieldComponent,
        CreateJobHeadlineComponent,
        CreateJobErrorComponent
    ],
    exports: [
        CreateJobFormComponent,
        CreateJobErrorComponent,
        CreateJobHeadlineComponent
    ]
})
export class CreateJobSharedModule { }