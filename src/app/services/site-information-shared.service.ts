import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { siteInfo } from '../pages/Models/siteInfo';
import { APICallerService } from '../shared/services/apicaller.service';
import { siteInformationService } from '../shared/services/siteInformation.service';
import { changeLanguageService } from './changeLanguage.service';

@Injectable({
  providedIn: 'root'
})
export class SiteInformationSharedService {
  siteInformation:siteInfo;
  siteInformationBS = new BehaviorSubject<siteInfo>({} as siteInfo);
  constructor(private callApi : APICallerService,private s:siteInformationService,
    private lang:changeLanguageService) { 
    this.siteInformationBS.next(this.siteInformation);
    // this._comp2ValueBS.next(this.comp2Val);
  }
  updateSiteInformation() {
    this.s.getAllInformation(this.lang.getLanguageID()).subscribe(x=>{
      if(!x.isError)
      {
        if(x.result['succeeded'])
        {
          this.siteInformation=x.result['data'];
          this.siteInformationBS.next(this.siteInformation);
        }
        else{
  
        }
      }
      
    })
  }
}
