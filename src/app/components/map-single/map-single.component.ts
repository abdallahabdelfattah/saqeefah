import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-single',
  templateUrl: './map-single.component.html',
  styleUrls: ['./map-single.component.scss']
})
export class MapSingleComponent implements OnInit {
  @Input() LatLngExpressionSetView:any;
  @Input()  project:any;
  constructor() { }

  ngOnInit() {
    this.LatLngExpressionSetView=[24.68163,46.785942];

      // Create the map
      const map = L.map('map').setView(this.LatLngExpressionSetView, 13);

      map.scrollWheelZoom.disable()

      // Add the tile layer (you can use any tile provider)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      // Define a custom marker icon
      const markerIcon = L.icon({
        iconUrl: 'assets/images/icons/map_icon_gold.png',
        shadowUrl: 'assets/images/icons/marker-shadow.png',
        iconSize: [60, 80],
        iconAnchor: [25, 41],
        popupAnchor: [5, -41]
      });

      // Add a marker to the map with the custom icon
      const marker = L.marker([24.68163,46.785942]).addTo(map);

      // Customize the popup content
      const popupContent = `
      <div class="map-card" >
      <div class="project-img">
          <img src="'assets/images/home-placeHolder.webp'}" class="card-img-top" alt="...">
      </div>
      <div class="project-info">
          <h6 class="project-title">project Name</h6>
          <h6 class="project-city">city</h6>
      </div>
  </div>

      `;

      // Add a popup to the marker with the custom content
      marker.bindPopup(popupContent);

  }


}
