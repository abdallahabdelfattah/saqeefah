import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import {  Image } from '@ks89/angular-modal-gallery';
import { environment } from 'src/environments/environment';
interface imageGallery {
  path:string
}
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})


export class GalleryComponent implements OnInit,AfterViewInit {
  @Input() galleryImage
  images: Image[] = [];
  appRootUrl = environment.appRoot+'/';
  constructor() { }

  ngOnInit(): void {
    this.addImageGallery()

  }
  ngAfterViewInit(): void {
  }
addImageGallery(){
  for(let i = 0 ; i < this.galleryImage.length; i++){
    let x = this.galleryImage[i].path
    this.images.push( new Image(
      i,
      {
        img:this.appRootUrl+x
      },
      {
        img:this.appRootUrl+x
      }
    ))
  }
  
}
}
