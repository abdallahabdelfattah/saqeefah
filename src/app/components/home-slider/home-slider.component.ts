import { Component, OnInit } from '@angular/core';
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
appRootUrl=environment.appRoot+'/';
  constructor(private sliderServices :SliderService, private language:changeLanguageService) { }

  ngOnInit(): void {
    this.getSliderHomeBanar(); 

    
    this.language.changeLanguageStatus.subscribe((data) => {
      this.getSliderHomeBanar()
    })

  }

  getSliderHomeBanar(){
    this.sliderServices.getAllSliderByidForUser(SliderTypes.SliderHomeBanar,this.language.getLanguageID()).subscribe((response:any)=>{
  if(!response?.isError){
      this.slider=response?.result?.data
      console.log('slider', this.slider)
  }
    })
  }
  


  // getAllSliderAttatchments() {
  //   this.sliderServices.getAllSliderByid(SliderTypes.SliderHomeBanar).subscribe(res => {
  //     if (!res.isError) {
  //       this.slider = res.result.data;
  //       console.log('slider', this.slider)
  //     }
  //   })
  // }

}
