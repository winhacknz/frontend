import { Component, Inject } from '@angular/core';
import { NgSwitch, NgSwitchDefault, Control, Validators } from '@angular/common';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { SafetyService } from './service.safety';
import 'rxjs/Rx';
import { Crime } from './model.crime';

@Component({
    selector: 'safety',
    directives: [],
    providers: [SafetyService],
    templateUrl: '/app/safety/safety.html'
})
export class SafetyComponent {
	private crimeData: Array<Crime>;

    constructor(private safetyService: SafetyService){
    	this.crimeData = safetyService.getCrimeData();
    }
}