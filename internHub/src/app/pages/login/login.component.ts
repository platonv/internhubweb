import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService, User } from './login.service';

import 'style-loader!./login.scss';

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder, private _loginService: LoginService, private _router: Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  
  onLoginSuccess(data){
    console.log("Logged in success", data);
    this._router.navigate(['/jobs']);
  }

  public onSubmit(user:User):void {
    this.submitted = true;
    if (this.form.valid) {
      console.log(user);
      this._loginService.authenticateUser(user).subscribe( 
        data => this.onLoginSuccess(data),
        err => console.log(err));
    }
  }
}
