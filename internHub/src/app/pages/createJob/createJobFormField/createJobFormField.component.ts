import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { BaseField } from '../../baseForm/baseForm';

@Component({
    selector:   'createJobFormField',
    template: 'createJobFormField.component.html',
    styles: ['createJobFormField.component.css']
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
