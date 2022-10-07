
import {  Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { GenaricService } from 'src/app/services/Genaric.service';
import { ProjectAndListService } from 'src/app/services/project-lists.service';
import { SliderService } from 'src/app/pages/dashboard/setting/services/slider.service';
import { SettingTypes, SliderTypes } from 'src/app/shared/Enums/enums';
import { SettingsService } from '../dashboard/setting/services/settings.service';
import { siteInformationService } from 'src/app/shared/services/siteInformation.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  OurPartners:any ;
  projectList = []
  AllProjects = []
  projectsForSale =[]
  projectsBooked = []
  projectsForSaleSoon = []
  Panorama
  constructor(private generalService:GenaricService, private projects:ProjectAndListService,
    private language:changeLanguageService,private sieInfo:siteInformationService, private siteSetting:SettingsService,private slider :SliderService) {



  }
  get SettingTypes(){
    return SettingTypes
  }

getAllProjects(){
  this.projects.getFilteredProjects(this.language.getLanguageID(),0/*both ready for sale and soon for sale*/ ).subscribe((response:any)=>{
    this.AllProjects = []
    this.projectsForSale =[]
    this.projectsForSaleSoon = []
   if(response.succeeded){
    this.AllProjects = response.data
    this.projectsForSale = response.data?.filter((item:any)=> item.statusId == 1 )
    this.projectsForSaleSoon = response.data?.filter((item:any)=> item.status == 2)
   }
  })
}

  ngOnInit(): void {

    this.generalService.changeNavBarTheme({transparentNav:false})
    //console.log(this.generalService.checkNavIsTRansparent())
    this.getAllProjects();
    this.getOurPartnersSlider();
   this.language.changeLanguageStatus.subscribe((data)=>{
    console.log('language updated',data)
    this.getAllProjects();
    this.getOurPartnersSlider();
  })
  }
  ngOnDestroy(): void{
    this.generalService.changeNavBarTheme({transparentNav:false})
    console.log(this.generalService.checkNavIsTRansparent())

  }

  getOurPartnersSlider(){
    this.slider.getAllSliderByidForUser(SliderTypes.OurPartners,this.language.getLanguageID()).subscribe((response:any)=>{
  if(!response.isError){
    console.log('all sliders',response.result.data)
      this.OurPartners=response.result.data
  }
    })
  }

  // getPanoramaSetting() {
  //   return this.siteSetting.getAllsettings(this.language.getLanguageID()).subscribe((response) => {
  //     if (!response.isError) {
  //       let allSetting = response.result.data
  //       this.Panorama = allSetting.filter((setting) => setting.settingTypeId == SettingTypes.Panorama)[0];
  //     }
  //   })
  // }


}
