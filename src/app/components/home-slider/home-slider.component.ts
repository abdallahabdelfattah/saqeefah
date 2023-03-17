import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SliderService } from 'src/app/pages/dashboard/setting/services/slider.service';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { SliderTypes } from 'src/app/shared/Enums/enums';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss']
})
export class HomeSliderComponent implements OnInit {
slider:any;

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
  rtl:this.language.checkRtl(),
  nav: false,
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

appRootUrl=environment.appRoot+'/';
  constructor(private sliderServices :SliderService, private language:changeLanguageService) { }

  async ngOnInit(): Promise<void> {
   await this.getSliderHomeBanar(); 
    this.language.changeLanguageStatus.subscribe((data) => {
      this.getSliderHomeBanar()
    }); 

  }

  getSliderHomeBanar(){
    this.sliderServices.getAllSliderByidForUser(SliderTypes.SliderHomeBanar,this.language.getLanguageID()).subscribe((response:any)=>{
  if(! response.isError){
      this.slider=response?.result?.data
  }
    })
  }
  

  getUrl(path: string) {
    if(path)
    {
      path = path.replace(/[\/\\]/g, '/');
      path = path.replace(/ /g, '%20');
      return path;
    }
    else{
      return ""; 
    }
  }



}
