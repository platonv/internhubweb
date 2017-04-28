import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Angular2TokenService } from '../../services/token-service/auth-token.service';
import { JobsService, Job} from './jobs.service';
import'jquery';

@Component({
  providers:[JobsService],
  selector: 'jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css','./dist_LTE/css/AdminLTE.min.css',
  './dist_LTE/css/skins/_all-skins.min.css','./bootstrap_LTE/css/bootstrap.min.css']

})
export class JobsComponent implements OnInit {
  public jobs:Job [];
/*
  constructor(public _tokenService: Angular2TokenService, private _http: Http) {
    this._tokenService.init();
    this._tokenService.get( "jobs").subscribe(
      data => this.jobs = data.json(),
      err => console.log(err));
   }
   */
  constructor(private jobsService:JobsService){

  }
  
   getJobs():void{
     this.jobsService.getJobs().then(jobs=>this.jobs=jobs);
   }
  ngOnInit() {
    this.getJobs();
  }

}
