import {  OnInit } from '@angular/core';
import {  Component, Input } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-map-project-single',
  templateUrl: './map-project-single.component.html',
  styleUrls: ['./map-project-single.component.scss']
})
export class MapProjectSingleComponent  {

  @Input() DataForMap ;
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 12,
    center: { lat: 24.626137, lng: 46.821603 },

  }
  initMarkers() {
    this.DataForMap.subscribe((response: any) => {
      if (!response.errors) {
        let obj ={ lat:response.data.latitude, lng: response?.data.longitude };
          const data = {
            position: { lat:response.data.latitude, lng: response?.data.longitude },
            //position: { lat:24.626137, lng: 46.821603},
            draggable: false
          };
          const marker = this.generateMarker(data, 0);
            // Customize the popup content
  const popupContent = `
  <div class="map-card villa_map_card" >

  <div class="project-info">
      <h6 class="project-title"> ${response?.data?.projectName}</h6>
  </div>
</div>
  `;
  // Define a custom marker icon
  const markerIcon = Leaflet.icon({
    iconUrl: 'assets/images/icons/map_icon_gold.png',
    shadowUrl: 'assets/images/icons/marker-shadow.png',
    iconSize: [40, 55],
    iconAnchor: [25, 41],
    popupAnchor: [5, -41]
  });
          marker.addTo(this.map).bindPopup(popupContent).openPopup().setIcon(markerIcon);
          this.map.panTo(data.position);
          this.markers.push(marker);
      }
    });
  }
  generateMarker(data: any, index: number) {
    var result= Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index));
      //.on('dragend', (event) => this.markerDragEnd(event, index));
      return result;
  }
  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.map.scrollWheelZoom.disable();
    this.initMarkers();
  }
  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }


  ngAfterViewInit(): void{

  }

}
