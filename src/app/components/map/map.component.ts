import { Component, AfterViewInit, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import * as L from 'leaflet';
import { siteInfo } from 'src/app/pages/Models/siteInfo';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { MarkerService } from 'src/app/services/Maker.service';
import { SiteInformationSharedService } from 'src/app/services/site-information-shared.service';
import { siteInformationService } from 'src/app/shared/services/siteInformation.service';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
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
      center: [ 24.61163,46.785942],
      zoom: 3
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 30,
      minZoom: 11,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    this.map.scrollWheelZoom.disable()
    tiles.addTo(this.map);
  }
  siteInformation:siteInfo;

  constructor(private markerService: MarkerService,private shared:SiteInformationSharedService,
    private siteInfo:siteInformationService,private language:changeLanguageService, private translate:TranslateService) { }
  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeCapitalMarkers(this.map);
  }

  ngOnInit(): void {
    // this.getAllSiteInformation();
    // this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
    // {
    //   this.getAllSiteInformation();
    // });


  }
  ngAfterContentChecked() {
    this.siteInformation=this.shared.siteInformation;
    // console.log("shared data : ",this.shared.siteInformation)
  }
  // getAllSiteInformation(){
  //   this.siteInfo.getAllInformation(this.language.getLanguageID()).subscribe(x=>{
  //     if(!x.isError)
  //     {
  //       if(x.result['succeeded'])
  //       {
  //         this.siteInformation=x.result['data'];
  //       }
  //     }

  //   })
  // }

}
