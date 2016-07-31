import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { SafetyComponent } from './safety/safety.component';
import { FormComponent } from './form.component';
import { ResultsComponent } from './results.component';

const routes: RouterConfig = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'start', component: FormComponent },
    { path: 'results', component: ResultsComponent },
    { path: 'safety', component: SafetyComponent }
];

export const appRouterProviders = [
    provideRouter(routes)
];
