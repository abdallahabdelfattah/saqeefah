import {  AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapleafletService } from 'src/app/shared/services/mapleaflet.service';
@Component({
  selector: 'app-map-single',
  templateUrl: './map-single.component.html',
  styleUrls: ['./map-single.component.scss']
})
export class MapSingleComponent implements OnInit , AfterViewInit,OnDestroy {
  @Input() LatLngExpressionSetView:any;
  @Input()  project:any;
  constructor(private mapleafletService: MapleafletService) { }

  ngOnInit() {

  }

  private initMap(): void {
    this.LatLngExpressionSetView=[24.68163,46.785942];
    // Create the map
     this.mapleafletService.map = L.map('map').setView(this.LatLngExpressionSetView, 13);
    this.mapleafletService.map.scrollWheelZoom.disable()
    // Add the tile layer (you can use any tile provider)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 20,
    minZoom: 16,
    }).addTo(this.mapleafletService.map);


}



ngAfterViewInit(): void {

  // Check if the map container already has a map instance
  if (!this.hasMapInstance('map')) {
    // Map initialization code goes here
    // Create the map instance
      this.initMap();
  }
   // Define a custom marker icon
   const markerIcon = L.icon({
    iconUrl: 'assets/images/icons/map_icon_gold.png',
    shadowUrl: 'assets/images/icons/marker-shadow.png',
    iconSize: [40, 55],
    iconAnchor: [25, 41],
    popupAnchor: [5, -41]
  });

  // Add a marker to the map with the custom icon
  const marker = L.marker([24.68163,46.785942],{icon:markerIcon}).addTo(this.mapleafletService.map);

  // Customize the popup content
  const popupContent = `
  <div class="map-card villa_map_card" >

  <div class="project-info">
      <h6 class="project-title"> مشروع سقيفة </h6>
  </div>
</div>
  `;
  // Add a popup to the marker with the custom content
  marker.bindPopup(popupContent).openPopup();

}


ngOnDestroy() {
  // Destroy the map instance and clean up resources
  if (this.mapleafletService.map) {
    this.mapleafletService.map.remove();
  }
}

private hasMapInstance(containerId: string): boolean {
  // Check if the container already has a map instance
  const container = document.getElementById(containerId);
  return container && container.hasChildNodes();
}



}
