import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Angular2TokenService } from '../../services/token-service/auth-token.service';

export class Job {
  constructor(public name: string, public startingDate: Date, public endingDate: Date,public languages:string,public description,string) { }
}

@Injectable()
export class CreateJobService {
  constructor(private _http: Http, public _tokenService: Angular2TokenService) {
    this._tokenService.init();
   }

  saveJob(job: Job) {
 //   return this._tokenService.createJob(job);
  }
}
