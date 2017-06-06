import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { BaseField,CREATE_JOB } from '../baseForm/baseForm';

@Injectable()
export class CreateJobFormService {

    // Submit Event
    public submit$ = new EventEmitter<any>();
    public submitLock: boolean = false;

    // Form Building
    public formGroup: FormGroup;
    public fields: BaseField[];

    constructor() { 
    }

    public initForm(fields:BaseField[]) {
        this.fields=fields;
        this._createFormGroup();
    }

    public submit() {
        this.submitLock = true;
        this.submit$.emit(this.formGroup.value);
    }

    public unlockSubmit() {
        this.formGroup.reset();
        this.submitLock = false;
    };

    private _createFormGroup() {

        let group: any = {};

        this.fields.forEach(question => {
            group[question.key] = new FormControl(null, question.validators);
        });

        this.formGroup = new FormGroup(group);
    }
}
