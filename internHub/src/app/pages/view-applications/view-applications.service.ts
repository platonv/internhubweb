import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Angular2TokenService } from '../../services/token-service/auth-token.service';

export class Job {
  constructor(public id: number, public name: string, public description: string, public created_at: string, public updated_at: string, public company_id: string) { }
}

export class Student {
  constructor(public id: number, public provider: string, public uid: string, public name: string, public nickname: string, public image: string, public email: string, public created_at: string, public updated_at: string, public first_name: string, public last_name: string, public birthday: string, public start_year: string) { }
}

export class Data {
  constructor(public id: number, public student: Student, public job: Job) { }
}

export class Apps {
  constructor(public id: number, public description: string, public name: string, public email: string) { }
}

@Injectable()
export class ViewApplicationsService {
  constructor(private tokenService: Angular2TokenService) {
    this.tokenService.init();
  }

  getApplications(): Observable<Data[]> {
    return this.tokenService.get("applications")
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


