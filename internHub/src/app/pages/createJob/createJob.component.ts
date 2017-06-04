import { Component }  from '@angular/core';

import { CreateJobService } from './createJob.service';
import { CreateJobFormFieldComponent } from '../createJobFormField';

@Component({
    selector: 'createJob',
    template:'createJob.component.html',
    styles: ['createJob.component.css']
})

export class CreateJobComponent {
    constructor(public _formService: CreateJobService) { }
}
