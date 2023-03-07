import { NgModule } from '@angular/core';
import 'hammerjs';
import 'mousetrap';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MarkerService } from '../services/Maker.service';
import { PopupService } from '../services/popup.service';
import { PanoramaComponent } from './panorama/panorama.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { SearchFormComponent } from './search-form/search-form.component';
// import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { GalleryComponent } from './gallery/gallery.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LogoSliderOneComponent } from './logo-slider-one/logo-slider-one.component';
import { LogoSlidertowComponent } from './logo-slidertow/logo-slidertow.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchProjectFormComponent } from './search-project-form/search-project-form.component';
import { SearchClientOrdersComponent } from './search-client-orders/search-client-orders.component';

import { SwipperGalleryComponent } from './swipper-gallery/swipper-gallery.component';
import { SwiperModule } from 'swiper/angular';
import { SvgComponent } from './svg/svg.component';
import { AboutSectionFacilityComponent } from './about-section/about-section-facility.component';
import { OurFeaturesComponent } from './our-features/our-features.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { InfoTableComponent } from './info-table/info-table.component';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { PlaceOrderApartmentComponent } from './place-order-apartment/place-order-apartment.component';
import { WhatsappButtonComponent } from './whatsapp-button/whatsapp-button.component';


@NgModule({
  declarations: [
    MapComponent,
    PanoramaComponent,
    ProjectCardComponent,
    PropertyCardComponent,
    SearchFormComponent,
    SearchClientOrdersComponent,
    SearchProjectFormComponent,
    ModalComponent,
    GalleryComponent,
    AboutSectionFacilityComponent,
    LogoSliderOneComponent,
    LogoSlidertowComponent,
    SwipperGalleryComponent,
    SvgComponent,
    OurFeaturesComponent,
    VideoPlayerComponent,
    InfoTableComponent,
    HomeSliderComponent,
    PlaceOrderApartmentComponent,
    WhatsappButtonComponent,
    
    // VedioComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    CarouselModule,
    SwiperModule,
    GalleryModule,
    
    TranslateModule.forRoot({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient] }}),
VgCoreModule,
VgControlsModule,
VgOverlayPlayModule,
VgBufferingModule



        
      ],
  exports:[
    MapComponent,
    PanoramaComponent,
    ProjectCardComponent,
    PropertyCardComponent,
    SearchFormComponent,
    SearchClientOrdersComponent,
    SearchProjectFormComponent,
    ModalComponent,
    GalleryComponent,
    AboutSectionFacilityComponent,
    LogoSliderOneComponent,
    LogoSlidertowComponent,
    SwipperGalleryComponent,
    SvgComponent,
    OurFeaturesComponent,
    VideoPlayerComponent,
    InfoTableComponent,
    HomeSliderComponent,
    PlaceOrderApartmentComponent,
    WhatsappButtonComponent
    // VedioComponent
  ],
  providers: [
    MarkerService,
    PopupService,
    // EmbedVideoService
   
  ]
})
export class ComponentsModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}