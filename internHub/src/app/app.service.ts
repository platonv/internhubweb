import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Element } from './element';

@Injectable()
export class AppService {
  elements:Element[];
  errorMessage: any;

  constructor(private http: Http) { }

  getElements() {
    return this.http.get("http://192.168.0.25:3000/users")
                     .subscribe(res => this.elements = res.json());
  }
}
