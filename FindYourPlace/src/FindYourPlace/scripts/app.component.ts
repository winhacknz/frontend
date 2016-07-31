///<reference path="./../typings/browser/ambient/es6-shim/index.d.ts"/>
import {Component} from '@angular/core';
import {NgSwitch, NgSwitchDefault, Control, Validators} from '@angular/common';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { ROUTER_DIRECTIVES } from '@angular/router';
import 'rxjs/Rx';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { SafetyComponent } from './safety/safety.component';
import { FormComponent } from './form.component';
import { ResultsComponent } from './results.component';

@Component({
    selector: 'my-app',
    directives: [HomeComponent, AboutComponent, SafetyComponent, FormComponent, ResultsComponent, ROUTER_DIRECTIVES],
    templateUrl: '/app/app.html'
})
export class AppComponent {

    constructor() {

    }
}