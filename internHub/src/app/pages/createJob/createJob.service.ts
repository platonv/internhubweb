import { Injectable } from '@angular/core';
import { Angular2TokenService } from '../../services/token-service/auth-token.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http';

import { JobWrite } from '../jobs/jobs.service';

@Injectable()
export class CreateJobService {
  constructor(public _tokenService: Angular2TokenService) {
    this._tokenService.init();
  }

  createJob(job: JobWrite): Observable<Response> {
    let body = JSON.stringify(job);
    return this._tokenService.post("jobs", body)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    // console.log("extactData: ", );
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}