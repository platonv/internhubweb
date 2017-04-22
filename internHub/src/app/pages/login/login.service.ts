import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Angular2TokenService } from '../../services/token-service/auth-token.service';

export class User {
  constructor(public email: string, public password: string, public userType: string) { }
}

@Injectable()
export class LoginService {
  constructor(private _http: Http, public _tokenService: Angular2TokenService) {
    this._tokenService.init();
   }

  authenticateUser(user: User) {
    user.userType = "company";
    console.log(user);
    return this._tokenService.signIn(user);
  }

  signOut(){
    return this._tokenService.signOut();
  }
}
