import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { PopupService } from 'src/app/services/popup.service';
import { APICallerService } from 'src/app/shared/services/apicaller.service';



@Component({
  selector: 'app-leaflet-maps',
  templateUrl: './leaflet-maps.component.html',
  styleUrls: ['./leaflet-maps.component.scss']
})
export class LeafletMapsComponent implements OnInit {

 @Input()  isSingleLocation; 

  @Input() data: any[] = [
    { lat: 24.68163, lng: 46.785942 },
    { lat: 24.67163, lng: 46.795942 },
    { lat: 24.67163, lng: 46.78 }
    // Add more data points as needed
  ];

  map: L.Map;
  constructor(private popupService: PopupService ) { }

  ngOnInit() {
    this.initializeMap();
    this.addDataToMap();
  }
  initializeMap() {
    this.map = L.map('map').setView([24.68163,46.785942], 12);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 12,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    this.map.scrollWheelZoom.disable()
    tiles.addTo(this.map);
  }

  addDataToMap() {
    this.data.forEach(item => {
      let c=item; 
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
      marker.addTo(this.map);
    });
  }

}
