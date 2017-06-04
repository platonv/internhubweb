import { Component }  from '@angular/core';

import { CreateJobService } from './createJob.service';
import { CreateJobFormFieldComponent } from './createJobFormField/createJobFormField.component';

@Component({
    providers:[CreateJobService],
    selector: 'createJob',
    template:`<form class="createJob"
            (ngSubmit)="_formService.submit()"
            [formGroup]="_formService.formGroup">

            <createJobFormField
                *ngFor="let field of this._formService.fields"
                [question]="field"
                [form]="_formService.formGroup">
            </createJobFormField>

            <button type="submit" [disabled]="!_formService.formGroup.valid || _formService.formGroup.pristine || _formService.submitLock">
                <ng-content *ngIf="!_formService.submitLock"></ng-content>
                <span *ngIf="_formService.submitLock">Submitting ...</span>
            </button>
        </form>`,
    styleUrls: ['./createJob.component.css']
})

export class CreateJobComponent {
    constructor(public _formService: CreateJobService) { }
}
