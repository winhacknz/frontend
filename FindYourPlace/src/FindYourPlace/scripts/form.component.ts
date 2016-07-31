import { Component } from '@angular/core';
import { Control, Validators } from '@angular/common';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';

@Component({
    selector: 'form',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: '/app/form.html'
})
export class FormComponent {

    constructor(private route: ActivatedRoute,
        private router: Router) {

    }

    goToResults() {
        this.router.navigate(['/results']);
    }
}