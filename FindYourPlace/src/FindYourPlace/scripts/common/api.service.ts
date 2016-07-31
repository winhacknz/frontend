import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Configuration } from './app.constants';

@Injectable()
export class ApiService {
 
    private endpoint: string;
    private headers: Headers;
 
    constructor(private _http:Http, 
                private _configuration: Configuration){

        this.endpoint = _configuration.ServerWithApiUrl;

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
 
    public get = (dimesion: string) => {
        return this._http.get(this.endpoint + dimesion)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
 
    public getSingle = (dimesion: string, id: number) => {
        return this._http.get(this.endpoint + id)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
 
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}