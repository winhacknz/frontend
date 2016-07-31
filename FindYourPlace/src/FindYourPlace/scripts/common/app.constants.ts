import { Injectable } from '@angular/core';
 
@Injectable()
export class Configuration {
	public apiConfig = {
		stubs:'stubs',
		remote: 'api'
	};
    public Server: string = 'http://localhost:5000/';
    public ApiUri: string = 'api/';
    public ApiStub: string = 'stubs/';
    public ServerWithApiUrl = this.Server + this.ApiStub;
}