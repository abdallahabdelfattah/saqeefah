
import {  Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { GenaricService } from 'src/app/services/Genaric.service';
import { ProjectAndListService } from 'src/app/services/project-lists.service';
import { SliderService } from 'src/app/pages/dashboard/setting/services/slider.service';
import { SettingTypes } from 'src/app/shared/Enums/enums';
import { ISettingType } from '../dashboard/setting/models/settingType.interface';
import { SettingsService } from '../dashboard/setting/services/settings.service';
import { siteInformationService } from 'src/app/shared/services/siteInformation.service';
import { siteInfo } from '../Models/siteInfo';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  AllSlider=[];

  projectList = []
  AllProjects = []
  projectsForSale =[]
  projectsBooked = []
  projectsForSaleSoon = []
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
    // this.projectsBooked = []


   if(response.succeeded){
    this.AllProjects = response.data
    this.projectsForSale = response.data?.filter((item:any)=> item.statusId == 1 )
    this.projectsForSaleSoon = response.data?.filter((item:any)=> item.status == 2)
    // this.projectsBooked = response.data?.filter((item:any)=> item.status == 3)

   }

  })
}

  ngOnInit(): void {

    this.generalService.changeNavBarTheme({transparentNav:false})
    //console.log(this.generalService.checkNavIsTRansparent())
    this.getAllProjects();
    this.getAllSlider();
  this.language.changeLanguageStatus.subscribe((data)=>{
    console.log('language updated',data)
    this.getAllProjects();
    this.getAllSlider();
 

  })
  }
  ngOnDestroy(): void{
    this.generalService.changeNavBarTheme({transparentNav:false})
    console.log(this.generalService.checkNavIsTRansparent())

  }

  getAllSlider(){
    this.slider.getAllSliders(this.language.getLanguageID()).subscribe((response:any)=>{
  if(!response.isError){
    console.log('all sliders',response)
      this.AllSlider= response.result.data
  }

    })
  }
}
