import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { AllSettingSharedService } from 'src/app/services/all-setting-shared.service';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { ProjectAndListService } from 'src/app/services/project-lists.service';
import { SiteInformationSharedService } from 'src/app/services/site-information-shared.service';
import { SettingTypes } from 'src/app/shared/Enums/enums';
import { SettingsService } from '../dashboard/setting/services/settings.service';
import { siteInfo } from '../Models/siteInfo';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  AboutUs
  ceoWord
  ourMeeting
  AllProjects = []
 ourMeetingBg
 ceoWordUrl
 bannerAboutUS
 bannerAboutUsUrl
 siteInformation:siteInfo;
  
  get settingTypes() {
    return SettingTypes
  }
  constructor(public setting: SettingsService, private sh: AllSettingSharedService,
    private language: changeLanguageService, private sanitizer: DomSanitizer,
    private projects: ProjectAndListService, private shared:SiteInformationSharedService) { }
  getAboutSetting() {
    return this.setting.getAllsettings(this.language.getLanguageID()).subscribe((response) => {
      if (!response.isError) {
        let allSetting = response.result.data
        this.AboutUs = allSetting.filter((setting) => setting.settingTypeId == SettingTypes.AboutUs)[0];
        this.bannerAboutUS=allSetting.filter((a:any)=>a.settingTypeId ==SettingTypes.BannerAboutUS)[0];
        this.bannerAboutUsUrl=this.getUrl(this.setting.appRootUrl+this.bannerAboutUS?.imagePath);
        this.ceoWord = allSetting.filter((setting) => setting.settingTypeId == SettingTypes.ceoWord)[0];
        this.ourMeeting = allSetting.filter((setting) => setting.settingTypeId == SettingTypes.ourMeeting)[0];
        this.ourMeetingBg = this.getUrl(this.setting.appRootUrl + this.ourMeeting?.imagePath);
        this.ceoWordUrl= this.getUrl(this.setting.appRootUrl + this.ceoWord?.imagePath);
        debugger
        
        console.log('website setting from about us page', allSetting)

      }
    })

  }

  getUrl(path: string) {
    path = path.replace(/[\/\\]/g, '/');
    path = path.replace(/ /g, '%20');
    return path;
  }

  getAllProjects() {
    this.projects.getFilteredProjects(this.language.getLanguageID(), 6).subscribe((response: any) => {
      console.log('all projects', response)
      this.AllProjects = []
      if (response.succeeded) {
        this.AllProjects = response.data
      }
    })
  }
  ngOnInit(): void {
    this.getAboutSetting()
    this.getAllProjects();
    this.language.changeLanguageStatus.subscribe((data) => {
      this.getAboutSetting()
      this.getAllProjects();
    })
  }

  ngAfterContentChecked() {
    this.siteInformation=this.shared.siteInformation;
    
  }


}
