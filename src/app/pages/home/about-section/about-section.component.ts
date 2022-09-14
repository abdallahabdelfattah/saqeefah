import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AllSettingSharedService } from 'src/app/services/all-setting-shared.service';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { SettingTypes } from 'src/app/shared/Enums/enums';
import { environment } from 'src/environments/environment';
import { SettingsService } from '../../dashboard/setting/services/settings.service';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.scss']
})
export class AboutSectionComponent implements OnInit {

  AboutUs
  OurVision
  OurGoals
  OurStory

public ourMeetingBg
  get settingTypes(){
    return SettingTypes
  }
  constructor(public setting:SettingsService, private settingShared:AllSettingSharedService,
    private language:changeLanguageService,private sanitizer:DomSanitizer) { }
 getAboutSetting(){
 return this.setting.getAllsettings(this.language.getLanguageID()).subscribe((response)=>{
    if(!response.isError){
      let allSetting = response.result.data
      this.AboutUs = allSetting.filter((setting)=> setting.settingTypeId == SettingTypes.AboutUs)[0];
      this.OurVision = allSetting.filter((setting)=> setting.settingTypeId == SettingTypes.OurVision)[0];
      this.OurGoals = allSetting.filter((setting)=> setting.settingTypeId == SettingTypes.OurGoals)[0];
      this.OurStory = allSetting.filter((setting)=> setting.settingTypeId == SettingTypes.OurStory)[0];
    }
  })
//  return this.settingShared.settingBS.subscribe((response)=>{
//       let allSetting = this.settingShared.setting;
//       this.AboutUs = allSetting.filter((setting)=> setting.settingTypeId == SettingTypes.AboutUs)[0];
//       this.OurVision = allSetting.filter((setting)=> setting.settingTypeId == SettingTypes.OurVision)[0];
//       this.OurGoals = allSetting.filter((setting)=> setting.settingTypeId == SettingTypes.OurGoals)[0];
//       this.OurStory = allSetting.filter((setting)=> setting.settingTypeId == SettingTypes.OurStory)[0];
    
//   })
}
  ngOnInit(): void {
    this. getAboutSetting()
    this.language.changeLanguageStatus.subscribe((data)=>{
      this. getAboutSetting()
      
    })
  }

}
