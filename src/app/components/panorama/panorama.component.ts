import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SettingsService } from 'src/app/pages/dashboard/setting/services/settings.service';
import { AllSettingSharedService } from 'src/app/services/all-setting-shared.service';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { SettingTypes } from 'src/app/shared/Enums/enums';


declare var PANOLENS:any
@Component({
  selector: 'app-panorama',
  templateUrl: './panorama.component.html',
  styleUrls: ['./panorama.component.scss']
})
export class PanoramaComponent implements OnInit, AfterViewInit {
  
  Panorama

  get settingTypes(){
    return SettingTypes
  }
  constructor(@Inject(DOCUMENT) private document: Document,private sh:AllSettingSharedService,
  public setting:SettingsService, private language:changeLanguageService,private sanitizer:DomSanitizer) { }
 getPanoramaSetting(){
  this.sh.settingBS.subscribe
  return this.setting.getAllsettings(this.language.getLanguageID()).subscribe((response)=>{
    if(!response.isError){
      let allSetting = response.result.data
      this.Panorama = allSetting.filter((setting)=> setting.settingTypeId == SettingTypes.Panorama)[0];
      if(this.Panorama){
        const panorama = new PANOLENS.ImagePanorama(this.setting.appRootUrl+this.Panorama.imagePath);
        const ele = this.document.querySelector('#container')
        const viewer = new PANOLENS.Viewer({
            container: ele,
            autoRotate:true,
            autoRotateSpeed:0.1,
            controlBar:false
        });
        viewer.add(panorama);
        viewer.OrbitControls.noZoom = true;
       }

    }
  })

  // return this.sh.settingBS.subscribe((response)=>{
  //   if(true){
  //     let allSetting = this.sh.setting;
  //     this.Panorama = allSetting.filter((setting)=> setting.settingTypeId == SettingTypes.Panorama)[0];
  //     if(this.Panorama){
  //       const panorama = new PANOLENS.ImagePanorama(this.setting.appRootUrl+this.Panorama.imagePath);
  //       const ele = this.document.querySelector('#container')
  //       const viewer = new PANOLENS.Viewer({
  //           container: ele,
  //           autoRotate:true,
  //           autoRotateSpeed:0.1,
  //           controlBar:false
  //       });
  //       viewer.add(panorama);
  //       viewer.OrbitControls.noZoom = true;
  //      }

  //   }
  // })
 }
 getArDataOnly(){
  return this.setting.getAllsettings(this.language.getLanguageID()).subscribe((response)=>{
    if(!response.isError){
      let allSetting = response.result.data
      this.Panorama = allSetting.filter((setting)=> setting.settingTypeId == SettingTypes.Panorama)[0];
      

    }
  })
  // let allSetting = this.sh.setting;
  // return this.Panorama = allSetting.filter((setting)=> setting.settingTypeId == SettingTypes.Panorama)[0];
  
 }
 ngOnInit(): void {
  this. getPanoramaSetting()
 
  
  this.language.changeLanguageStatus.subscribe((data)=>{
    this. getArDataOnly()
    
  })
}
ngAfterViewInit():void{

}
}
