import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-project-villas',
  templateUrl: './project-villas.component.html',
  styleUrls: ['./project-villas.component.scss']
})
export class ProjectVillasComponent implements OnInit {

  constructor() { }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoWidth:true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:4000 ,
    margin:0,
    center:true,
    items:1,
    navText: ['', ''],
    nav: true,
    responsive:{
      0:{
          items:1,
      },
      600:{
          items:1,
      },
      1000:{
          items:1,
      }
  }
  }

  ngOnInit(): void {
  }

}
