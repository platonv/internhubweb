import { Injectable } from '@angular/core';
import {JOBS} from '../mock-jobs/mock-jobs';

export class Job {
  constructor(public id: number, public name: string, public description: string, public created_at: string, public updated_at: string, public company_id: string ){}
}

@Injectable()
export class JobsService {

  constructor() { }

  getJobs():Promise<Job[]>{
    return Promise.resolve(JOBS);
  }

}
