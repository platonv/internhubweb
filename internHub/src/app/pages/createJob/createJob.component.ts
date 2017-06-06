import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CreateJobService } from './createJob.service';
import { JobWrite } from '../jobs/jobs.service';

import 'style-loader!./createJob.scss';

@Component({
  selector: 'createJob',
  templateUrl: './createJob.html',
})
export class CreateJob {

  public form: FormGroup;
  public name: AbstractControl;
  public description: AbstractControl;
  public startingDate: AbstractControl;
  public languages: AbstractControl;
  public endingDate: AbstractControl;
  public submitted: boolean = false;

  constructor(fb: FormBuilder, private _createJobService: CreateJobService, private _router: Router) {
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      // 'startingDate': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      // 'endingDate': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      // 'languages': ['', Validators.compose([Validators.required, Validators.minLength(2)])]
    });

    this.name = this.form.controls['name'];
    this.description = this.form.controls['description'];
    // this.startingDate = this.form.controls['startingDate'];
    // this.languages = this.form.controls['languages'];
    // this.endingDate = this.form.controls['endingDate'];
  }
  public onSubmit(job): void {
    this.submitted = true;
    var newJob: JobWrite = new JobWrite(job.name, job.description);
    if (this.form.valid) {
      console.log(newJob);
      this._createJobService.createJob(newJob).subscribe(
        data => console.log(data),
        err => console.log(err));
    }
  }
}
