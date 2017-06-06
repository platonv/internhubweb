import {Injectable} from '@angular/core';

@Injectable()
export class TodoService {

  private _todoList = [
    { text: 'Interview @InternHub' },
    { text: 'Interview @UniSquared' },
    { text: 'Talk with Manager' },
    { text: 'Take a break!' },
   
  ];

  getTodoList() {
    return this._todoList;
  }
}
