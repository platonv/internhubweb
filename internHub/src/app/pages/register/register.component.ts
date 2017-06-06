import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import { Router } from '@angular/router';

import {RegisterService, User} from './register.service'

import 'style-loader!./register.scss';

@Component({
  selector: 'register',
  templateUrl: './register.html',
})
export class Register {

  public form:FormGroup;
  public name:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;
  public userTypeSelect:string

  public submitted:boolean = false;

  constructor(fb:FormBuilder, private _registerService: RegisterService, private _router: Router) {

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  onRegisterSuccess(data){
    console.log("Register success", data);
    this._router.navigate(['/login']);
  }

  public onSubmit(user:User):void {
    this.submitted = true;
    user.userType = this.userTypeSelect;
    console.log(user)
    user.password = user.passwords.password;
    if (this.form.valid) {
      this._registerService.registerCompany(user).subscribe(
        data=>this.onRegisterSuccess(data),
        err=>console.log(err)
        );
    }
  }

  public setUserType(type){
    this.userTypeSelect = type;
  }
}
