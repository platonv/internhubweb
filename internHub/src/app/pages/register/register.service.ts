import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Angular2TokenService } from '../../services/token-service/auth-token.service';


export class User {
  constructor(public email: string, public password: string, public passwordConfirmation: string, public name: string, public userType: string) { }
}

@Injectable()
export class RegisterService{
    constructor(private _http: Http, public _tokenService: Angular2TokenService){
        this._tokenService.init();
    }

    registerCompany(user: User){
        return this._tokenService.registerAccount(user);
    }
}