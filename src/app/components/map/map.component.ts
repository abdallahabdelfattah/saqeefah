import { Component, AfterViewInit, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import * as L from 'leaflet';
import { siteInfo } from 'src/app/pages/Models/siteInfo';
import { MarkerService } from 'src/app/services/Maker.service';
import { SiteInformationSharedService } from 'src/app/services/site-information-shared.service';
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
export class MapComponent implements OnInit , AfterViewInit {
   map:any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 24.68163,46.785942],
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
  siteInformation:siteInfo;
  constructor(private markerService: MarkerService,private shared:SiteInformationSharedService) { }
  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeCapitalMarkers(this.map);
  }

  ngOnInit(): void {
  }
  ngAfterContentChecked() {
    this.siteInformation=this.shared.siteInformation;
  }


}
