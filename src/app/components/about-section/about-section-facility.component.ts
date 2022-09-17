import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { disableDebugTools, DomSanitizer } from '@angular/platform-browser';
import { SettingsService } from 'src/app/pages/dashboard/setting/services/settings.service';
import { pickList } from 'src/app/pages/placeorder/placeorder.component';
import { AllSettingSharedService } from 'src/app/services/all-setting-shared.service';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { PlaceOrderService } from 'src/app/services/placeOrder.service';
import { ProjectAndListService } from 'src/app/services/project-lists.service';
import { SettingTypes } from 'src/app/shared/Enums/enums';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-about-section-facility',
  templateUrl: './about-section-facility.component.html',
  styleUrls: ['./about-section-facility.component.scss']
})
export class AboutSectionFacilityComponent implements OnInit {

  AboutUs
  OurVision
  OurGoals
  OurStory
  OurServices

  AboutUsUrl
  OurVisionUrl
  OurGoalsUrl
  OurStoryUrl
  OurServicesUrl

  get settingTypes() {
    return SettingTypes
  }
  constructor(public setting: SettingsService, private settingShared: AllSettingSharedService,
    private language: changeLanguageService, private sanitizer: DomSanitizer) { }
  getAboutSetting() {
    return this.setting.getAllsettings(this.language.getLanguageID()).subscribe((response) => {
      if (!response.isError) {
        let allSetting = response.result.data
        this.AboutUs = allSetting.filter((setting) => setting.settingTypeId == SettingTypes.AboutUs)[0];
        this.OurVision = allSetting.filter((setting) => setting.settingTypeId == SettingTypes.OurVision)[0];
        this.OurGoals = allSetting.filter((setting) => setting.settingTypeId == SettingTypes.OurGoals)[0];
        this.OurStory = allSetting.filter((setting) => setting.settingTypeId == SettingTypes.OurStory)[0];
        this.OurServices = allSetting.filter((setting) => setting.settingTypeId == SettingTypes.OurServices)[0];

        this.OurVisionUrl = this.getUrl(this.setting.appRootUrl+this.OurVision?.imagePath);
        this.AboutUsUrl =this.getUrl(this.setting.appRootUrl+this.AboutUs?.imagePath);
        this.OurGoalsUrl = this.getUrl(this.setting.appRootUrl+this.OurGoals?.imagePath);
        this.OurStoryUrl = this.getUrl(this.setting.appRootUrl+this.OurStory?.imagePath);
        this.OurServicesUrl = this.getUrl(this.setting.appRootUrl+this.OurServices?.imagePath);
      }
    })

  }
getUrl(path:string){
  path= path.replace(/[\/\\]/g,'/');
  path= path.replace(/ /g,'%20');
  return path;
}
  ngOnInit(): void {
    this.getAboutSetting()
    this.language.changeLanguageStatus.subscribe((data) => {
      this.getAboutSetting()
    })
  }

  removeSpace(string){
    return string.replace(/ /g,'')
  }

}
