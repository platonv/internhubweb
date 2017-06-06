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
  
  constructor(private jobsService:JobsService){

  }
  
  getJobs():void{
     this.jobsService.getJobs()
              .subscribe( 
                data => this.onGetJobsSuccess(data),
                err => console.log(err)
              );
   }

  applyForJob(job_id) :void {
    this.jobsService.applyForJob(job_id)
              .subscribe( 
                data => console.log(data),
                err => console.log(err)
              );
  }
  ngOnInit() {
    this.getJobs();
  }

  onGetJobsSuccess(data) {
    console.log("onGetJobsSuccess: ", data);
    this.jobs = data;
  }

}


