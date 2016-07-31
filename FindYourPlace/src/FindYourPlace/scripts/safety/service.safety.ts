import { Injectable, Inject } from '@angular/core';
import { ApiService } from '../common/api.service';
import { Crime } from './model.crime';

@Injectable()
export class SafetyService {
   private crimeData: Array<Crime>;

    constructor(@Inject(ApiService) private _apiService){
    }

    public getCrimeData(){
        var crimeRaw = this._apiService.get('crime.json');

        this.crimeData = new Array<Crime>();

        for(var item of crimeRaw){
            var crimeDataItem = new Crime();
            crimeDataItem.id = item.id;
            crimeDataItem.region = item.RegionalCouncil;
            crimeDataItem.incident = item.incidentRate;
            this.crimeData.push(crimeDataItem);
        }

        return this.filter(this.crimeData);        
    }

    private filter = (crimeData: Array<Crime>) => {
        return crimeData;
    }
}