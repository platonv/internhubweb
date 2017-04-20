import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Angular2TokenService } from '../../services/token-service/auth-token.service';
import { JobsService, Job} from './jobs.service';

@Component({
  selector: 'jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  public jobs:Job [];

  constructor(public _tokenService: Angular2TokenService, private _http: Http) {
    this._tokenService.init();
    this._tokenService.get( "jobs").subscribe(
      data => this.jobs = data.json(),
      err => console.log(err));
   }

  ngOnInit() {
  }

}
