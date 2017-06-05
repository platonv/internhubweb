import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService } from '../../services/token-service/auth-token.service';

import { CreateJobFormService } from './createJobForm/createJobForm.service';
import { CREATE_JOB } from './baseForm/baseForm';

@Component({
    selector:   'createJob',
    providers:  [CreateJobFormService],
    template: `
        <createJobHeadline>Create Job</createJobHeadline>
        <createJobError [errors]="_errors"></createJobError>
        <createJobForm>Create Job:</createJobForm>
    `
})
export class CreateJobComponent {

    _errors: string[];

    constructor(
        public _formService: CreateJobFormService,
        public _sessionService: Angular2TokenService,
        public _router: Router
    ) {
        this._formService.initForm(CREATE_JOB);
    }

    private _handleSuccess(data: any) {
        this._errors = null;
        this._formService.unlockSubmit();
        this._router.navigate(['restricted']);
    }

    private _handleError(error: any) {
        this._errors = error.json().errors;
        this._formService.unlockSubmit();
    }
}
