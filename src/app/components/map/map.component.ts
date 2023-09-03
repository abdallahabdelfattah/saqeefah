import { Component, AfterViewInit, OnInit, Input, OnDestroy } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import * as L from 'leaflet';
import { Layer, Marker } from 'leaflet';

import { siteInfo } from 'src/app/pages/Models/siteInfo';
import { MarkerService } from 'src/app/services/Maker.service';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { PopupService } from 'src/app/services/popup.service';
import { SiteInformationSharedService } from 'src/app/services/site-information-shared.service';
import { APIs } from 'src/app/shared/helper/APIs';
import { APICallerService } from 'src/app/shared/services/apicaller.service';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
// const iconUrl = 'assets/images/icons/map_icon_gold.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  map: any;
  statusIdFilter = 0;
  private initMap(): void {

    this.map = L.map('map', {
      center: [24.68163, 46.785942],
      zoom: 1
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 12,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    this.map.scrollWheelZoom.disable()
    tiles.addTo(this.map);
  }
  siteInformation: siteInfo;
  constructor(private shared: SiteInformationSharedService, private popupService: PopupService, private aPICallerService: APICallerService, private language: changeLanguageService) { }
  ngAfterViewInit(): void {
    if (!this.map) {
      this.initMap();
    }
    this.makeCapitalMarkers(this.map);
  }

  ngOnInit(): void {
  }
  ngAfterContentChecked() {
    this.siteInformation = this.shared.siteInformation;
  }

  ngOnDestroy() {
    // Destroy the map instance and clean up resources
    if (this.map) {
      this.map.remove();
    }
  }


  makeCapitalMarkers(map: L.Map): void {
    let ApiUrl = APIs.projects.GetProjects + "?languageId=" + this.language.getLanguageID();
    this.aPICallerService.get(ApiUrl).subscribe((res: any) => {
      let projects=res?.result?.data;
      for (const c of projects) {
        var greenIcon = new L.Icon({
          iconUrl: c.statusId == 1 ? 'assets/images/icons/for_sale_icon.png' : c.statusId == 2 ? 'assets/images/icons/soon_icon.png' : 'assets/images/icons/sold_icon.png',
          shadowUrl: 'assets/images/icons/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
        const lon = c.longitude;
        const lat = c.latitude;

        const marker = L.marker([lat, lon],{ icon: greenIcon },);
        marker.bindPopup(this.popupService.makeCapitalPopup(c));
        marker["statusId"]=c.statusId;
        marker.addTo(map);

      }

    });
  }



  filterMarkers(statusId) {
    // this.statusIdFilter = statusId;
    // const allLayers: Layer[] = this.map.getLayers(); // Get all layers from the map
    // const markerLayers: Layer[] = allLayers.filter(layer => layer instanceof Marker); // Filter out only marker layers
    // const markers: L.Marker[] = markerLayers.map(markerLayer => markerLayer as L.Marker); // Cast to Marker type
    // markers.forEach(marker => {
    //   // Assuming the marker's statusId is stored in a property called 'statusId'
    //   marker.removeFrom(this.map);
    // });
  }



}
