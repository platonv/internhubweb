import { Component } from '@angular/core';

@Component({
    selector:   'createJobHeadline',
    template:   '<p><ng-content></ng-content></p>',
    styles:  [`
        p {
            text-align: center;
            color: white;
            font-size: 30px;
        }
    `]
})
export class CreateJobHeadlineComponent {
    constructor() { }
}