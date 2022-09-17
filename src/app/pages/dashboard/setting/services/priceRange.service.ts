import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APICallerService } from 'src/app/shared/services/apicaller.service';
import { Result } from 'src/app/shared/services/Result';
import { environment } from 'src/environments/environment';
import { ISettingType } from '../models/settingType.interface';

@Injectable({
  providedIn: 'root'
})
export class PriceRangeService {
  appRootUrl=environment.appRoot+'/'; 
  constructor(private aPICallerService:APICallerService) {
  }

   setPriceRange(body:any):Observable<any>{
   return this.aPICallerService.postWithAttachment(`api/Setting/AddRange`,body,true);
}
  getAllPriceRanges(rangetype:any){
    return this.aPICallerService.get(`api/Setting/GetRangesForAdmin?rangeTypeId=${rangetype}`)
  }
  delete(rangeId:any,rangeType:any){
    return this.aPICallerService.post(`api/Setting/DeleteRange?rangeId=${rangeId}&RangeTypeId=${rangeType}`,{})
  }

  
  
}
