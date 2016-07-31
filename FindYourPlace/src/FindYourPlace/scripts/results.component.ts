import { Component } from '@angular/core';
import { Control, Validators } from '@angular/common';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';

@Component({
    selector: 'results',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: '/app/results.html'
})
export class ResultsComponent {

    constructor(private router: Router) {

    }

    goToStart() {
        this.router.navigate(['/start']);
    }
}