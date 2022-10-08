import { Component, OnInit, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SliderService } from 'src/app/pages/dashboard/setting/services/slider.service';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { SliderTypes } from 'src/app/shared/Enums/enums';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logo-slider-one',
  templateUrl: './logo-slider-one.component.html',
  styleUrls: ['./logo-slider-one.component.scss']
})
export class LogoSliderOneComponent implements OnInit {
@Input() logos= [];
slider:any; 
appRootUrl=environment.appRoot+'/';

customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  autoWidth:true,
  pullDrag: false,
  dots: false,
  autoplay:true,
  autoplayTimeout:3000 ,
  margin:10,
  center:false,

  navText: ['', ''],
  rtl:this.language.checkRtl(),
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
}
bannerimgUrl= []

  constructor(private language:changeLanguageService,private sliderServices:SliderService) { }
  ngOnInit(): void {
    this.getSlider();

    this.language.changeLanguageStatus.subscribe((data) => {
      this.getSlider()
    })

  }

  getSlider(){
    this.sliderServices.getAllSliderByidForUser(SliderTypes.OurPartners,this.language.getLanguageID()).subscribe((response:any)=>{
  if(!response?.isError){
      this.slider=response?.result?.data   
    this.slider?.sliderAttachment.forEach(element => {
      this.bannerimgUrl.push(this.getUrl(this.appRootUrl+element?.path));
    });

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
