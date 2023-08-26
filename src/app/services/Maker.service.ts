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

  constructor(private popupService: PopupService , private aPICallerService:APICallerService, private language:changeLanguageService) { }


  makeCapitalMarkers(map: L.Map): void {
     let ApiUrl=  APIs.projects.GetProjects+"?languageId="+this.language.getLanguageID();

    this.aPICallerService.get(ApiUrl).subscribe((res: any) => {
        for (const c of res.result.data) {
          var greenIcon = new L.Icon({
            iconUrl: c.statusId== 1? 'assets/images/icons/for_sale_icon.png': c.statusId== 2?'assets/images/icons/soon_icon.png': 'assets/images/icons/sold_icon.png',
            shadowUrl: 'assets/images/icons/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
          const lon = c.longitude;
          const lat = c.latitude;
          const marker = L.marker([lat, lon], {icon: greenIcon});
          marker.bindPopup(this.popupService.makeCapitalPopup(c));
          marker.addTo(map);
        }
      });
  }


}
