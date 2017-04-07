import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AppService } from './app.service';
import { Element } from './element';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  elements: Element[];
  errorMessage: string;

  constructor (private http: Http) {
    this.getElements();
  }
  getElements() {
    this.http.get("http://192.168.0.25:3000/users")
                     .subscribe(res => this.elements = res.json());
  }
}
