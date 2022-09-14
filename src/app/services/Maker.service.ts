import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService  } from './popup.service';
import { APIs } from '../shared/helper/APIs';
import { APICallerService } from '../shared/services/apicaller.service';
import { changeLanguageService } from './changeLanguage.service';
@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  // capitals: string = 'assets/data/usa-capitals.json';

  constructor(private http: HttpClient,private popupService: PopupService , private aPICallerService:APICallerService, private language:changeLanguageService) { }
  makeCapitalMarkers(map: L.Map): void { 
 
     let ApiUrl=  APIs.projects.GetProjects+"?languageId="+this.language.getLanguageID(); 
    this.aPICallerService.get(ApiUrl).subscribe((res: any) => {
        for (const c of res.result.data) {
          const lon = c.longitude;
          const lat = c.latitude;
          const marker = L.marker([lat, lon]);
          marker.bindPopup(this.popupService.makeCapitalPopup(c));
          marker.addTo(map);
        }
      });
  }



  // makeCapitalMarkers2(map: L.Map): void { 
  //   this.http.get(this.capitals).subscribe((res: any) => {
  //       for (const c of res.features) {
  //         const lon = c.geometry.coordinates[0];
  //         const lat = c.geometry.coordinates[1];
  //         const marker = L.marker([lat, lon]);
  //         marker.bindPopup(this.popupService.makeCapitalPopup(c.properties));
  //         marker.addTo(map);
  //       }
  //     });
  // }



}