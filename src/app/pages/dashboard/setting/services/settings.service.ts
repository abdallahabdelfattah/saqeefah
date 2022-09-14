import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APICallerService } from 'src/app/shared/services/apicaller.service';
import { Result } from 'src/app/shared/services/Result';
import { environment } from 'src/environments/environment';
import { ISettingType } from '../models/settingType.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  appRootUrl=environment.appRoot+'/'; 
  constructor(private aPICallerService:APICallerService) {
  }

   setSetting(body:any):Observable<any>{
   return this.aPICallerService.postWithAttachment(`api/Setting`,body,true);
}
          
  getsettingsById(settingTypeId:any){
      return this.aPICallerService.get(`api/Setting?settingTypeId=${settingTypeId}`)
  }

  getAllsettings(languageId){
    return this.aPICallerService.get(`api/Setting/AllSettings?languageId=${languageId}`)
  }

  getAllsettingsType():Observable<Result<Array<ISettingType>>>{
    return this.aPICallerService.get(`api/Setting/AllSettingTypes`);
  }
  
  
}
