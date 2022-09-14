import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ISettingType } from '../pages/dashboard/setting/models/settingType.interface';
import { SettingsService } from '../pages/dashboard/setting/services/settings.service';
import { siteInfo } from '../pages/Models/siteInfo';
import { APICallerService } from '../shared/services/apicaller.service';
import { siteInformationService } from '../shared/services/siteInformation.service';
import { changeLanguageService } from './changeLanguage.service';

@Injectable({
  providedIn: 'root'
})
export class AllSettingSharedService {
  setting:ISettingType[];
  settingBS = new BehaviorSubject<ISettingType[]>({} as ISettingType[]);
  constructor(private callApi : APICallerService,private s:SettingsService,
    private lang:changeLanguageService) { 
    this.settingBS.next(this.setting);
    // this._comp2ValueBS.next(this.comp2Val);
  }
  updateAllSetting() {
    this.s.getAllsettings(this.lang.getLanguageID()).subscribe(x=>{
      if(!x.isError)
      {
        if(x.result['succeeded'])
        {
          this.setting=x.result['data'];
          this.settingBS.next(this.setting);
        }
        else{
  
        }
      }
      
    })
  }
}
