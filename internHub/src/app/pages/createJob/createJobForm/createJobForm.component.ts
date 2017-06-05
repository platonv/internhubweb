import { Component }  from '@angular/core';

import { CreateJobFormService } from './createJobForm.service';
import { CreateJobFormFieldComponent } from './createJobFormField/createJobFormField.component';

@Component({
    providers:[CreateJobFormService],
    selector: 'createJobForm',
    template:`<form class="createJobForm"
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
    styleUrls: ['./createJobForm.component.css']
})

export class CreateJobFormComponent {
    constructor(public _formService: CreateJobFormService) { }
}
