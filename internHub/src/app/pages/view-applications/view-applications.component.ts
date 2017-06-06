import { Component, Injectable } from '@angular/core';

import { SmartTablesService } from '.\internHub\src\app\services\view-applications\view-applications.service.ts';
import { LocalDataSource } from 'ng2-smart-table';
import { ViewApplicationsService } from "./view-applications.service";
import { Apps, Data } from "./view-applications.service";

@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.scss']
})

export class ViewApplicationsComponent {
  smartTableData: Apps[] = [];

  settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      description: {
        title: 'Description',
        type: 'string'
      },
      name: {
        title: 'Job Name',
        type: 'string'
      },
      email: {
        title: 'E-mail',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: ViewApplicationsService) {
    this.service.getApplications().
      subscribe(
      data => this.onGet(data),
      err => console.log(err)
      );
  }

  onGet(data: Data[]){
    this.smartTableData = data.map(data => new Apps(data.id, data.job.description, data.job.name, data.student.email));
    console.log("onGet: ", this.smartTableData);
    this.source.load(this.smartTableData);
  }

}
