import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { BaseField } from '../../baseForm/baseForm';

@Component({
    selector:'createJobFormField',
    template:`<div class="a2t-input-group"
            [formGroup]="form">

            <label
                [attr.for]="question.key"
                [style.color]="labelColor"
                *ngIf="_control.pristine">
                {{question.label}}
            </label>

            <label class="createJobError"
                [attr.for]="question.key"
                *ngIf="_control.hasError('required') && !_control.pristine">
                {{question.label}} is required
            </label>

            <label class="createJobError"
                [attr.for]="question.key"
                *ngIf="_control.hasError('minlength')">
                {{question.label}} is too short
            </label>

            <label class="createJobError"
                [attr.for]="question.key"
                *ngIf="_control.hasError('maxlength')">
                {{question.label}} is too long
            </label>

            <label class="a2t-valid"
                [attr.for]="question.key"
                *ngIf="_control.valid && !_control.pristine">
                {{question.label}}
            </label>

            <input
                [formControlName]="question.key"
                [id]="question.key"
                [type]="question.type">
        </div>`,
    styleUrls: ['createJobFormField.component.css']
})

export class CreateJobFormFieldComponent implements OnInit {

    @Input() question:  BaseField;
    @Input() form:      FormGroup;

    _control:   AbstractControl;

    ngOnInit() {
        this._control = this.form.controls[this.question.key];
    }

    get isValid() {
        return this._control.valid;
    }
}
