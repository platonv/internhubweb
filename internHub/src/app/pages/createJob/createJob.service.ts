import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { SignInData } from '../../../angular2-token.model';
import { BaseField } from '../baseForm/baseForm';
import { CREATE_JOB } from '../baseForm/baseForm';

@Injectable()
export class CreateJobService {

    // Submit Event
    public submit$ = new EventEmitter<any>();
    public submitLock: boolean = false;

    // Form Building
    public formGroup: FormGroup;
    public fields: BaseField[];

    constructor() { 
        this.fields=CREATE_JOB;
    }

    public initForm() {
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
