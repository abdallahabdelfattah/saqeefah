import { Component,OnInit, ViewEncapsulation, ViewChild, Input } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import { environment } from "src/environments/environment";

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'app-swipper-gallery',
  templateUrl: './swipper-gallery.component.html',
  styleUrls: ['./swipper-gallery.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SwipperGalleryComponent implements OnInit {
  @Input() galleryImage:any
  appRootUrl = environment.appRoot+'/';
  thumbsSwiper: any;
  constructor() { }

  ngOnInit(): void {
  }

}
