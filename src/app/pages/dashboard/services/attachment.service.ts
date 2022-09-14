import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIs } from 'src/app/shared/helper/APIs';
import { APICallerService } from 'src/app/shared/services/apicaller.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Result } from 'src/app/shared/services/Result';
import { ITestItemResponses } from './ITestItem.interface';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {


  public deleteAttachment(id:any,type:string){
    return this.apiCaller.post("api/"+type+"/DeleteAttachments",{
      "attachmentsIds": [
        id
      ]
    },true);
  }

  public deleteProjectAttachments(_projectId:Number,_type:number){

    return this.apiCaller.post("api/Project/DeleteMasterPaneorSpecificationOrCoverImage/?projectId="+_projectId+"&type="+_type,{},true);
  }
  public deleteApartmentCover(_ApartmentId){

    return this.apiCaller.post("api/Apartment/DeleteCoverImage/?apartmentId="+_ApartmentId,{},true);
  }
  public deleteSettingImage(_settingTypeId){

    return this.apiCaller.post("api/Setting/DeleteSettingImage/?settingTypeId="+_settingTypeId,{},true);
  }
  constructor(
    private apiCaller: APICallerService
  ) {}






  
}

 enum ProjectDeleteType
{
        MasterPlane=1,
        Specification=2,
        Granties=3,
        CoverImage=4
}



