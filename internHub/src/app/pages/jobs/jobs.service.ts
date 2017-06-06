import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Angular2TokenService } from '../../services/token-service/auth-token.service';


export class Job {
  constructor(public id: number, public name: string, public description: string, public created_at: string, public updated_at: string, public company_id: string) { }
}
export class JobWrite {
  constructor(public name: string, public description: string) { }
}

@Injectable()
export class JobsService {

  constructor(private tokenService: Angular2TokenService) {
    this.tokenService.init();
  }

  getJobs(): Observable<Job[]> {
    return this.tokenService.get("jobs")
      .map(this.extractData)
      .catch(this.handleError);
  }

  applyForJob(job_id): Observable<Response> {
    let body = "{\"job_id\":\"" + job_id + "\"" + "}";
    return this.tokenService.post("applications", body)
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
