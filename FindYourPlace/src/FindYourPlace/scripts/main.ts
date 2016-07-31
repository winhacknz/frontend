///<reference path="./../typings/browser/ambient/es6-shim/index.d.ts"/>
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import { HTTP_PROVIDERS, Http, ConnectionBackend } from '@angular/http';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import { appRouterProviders } from './app.routes';
import { ApiService } from './common/api.service';
import { SafetyService } from './safety/service.safety';
import { Configuration } from './common/app.constants';

bootstrap(AppComponent, [
    appRouterProviders,
    HTTP_PROVIDERS,
    Http,
    ConnectionBackend,
    Configuration,
    ApiService,
    SafetyService,
    disableDeprecatedForms()
])
.catch(err => console.error(err));