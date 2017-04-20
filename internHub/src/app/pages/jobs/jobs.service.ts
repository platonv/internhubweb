import { Injectable } from '@angular/core';

export class Job {
  constructor(public id: number, public name: string, public description: string, public created_at: string, public updated_at: string, public company_id: string ){}
}

@Injectable()
export class JobsService {

  constructor() { }

}
