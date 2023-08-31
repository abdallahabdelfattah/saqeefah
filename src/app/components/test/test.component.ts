import { AfterViewInit, Component, Input } from '@angular/core';
import * as Leaflet from 'leaflet';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements AfterViewInit{

  @Input() project ;
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 16,
    center: { lat: 24.626137, lng: 46.821603 },
  }
  initMarkers() {
    const initialMarkers = [
      {
        //position: { lat:this.project.longitude, lng: this.project.longitude },
        position: { lat:24.626137, lng: 46.821603},
        draggable: false
      }
    ];
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup(`<b> مشروع سقيفة ${data.position.lat},  ${data.position.lng}</b>`);
      this.map.panTo(data.position);
      this.markers.push(marker)
    }
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index));
      //.on('dragend', (event) => this.markerDragEnd(event, index));
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

  // markerDragEnd($event: any, index: number) {
  //   console.log($event.target.getLatLng());
  // }


  ngAfterViewInit(): void{
    this.markers[1].setLatLng({ lat: 24.725043, lng: 46.910135 });
    this.markers[2].setLatLng({ lat: 24.725043, lng: 46.910135 });
  }


}
