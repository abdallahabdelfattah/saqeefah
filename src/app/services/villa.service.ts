import { Injectable } from '@angular/core';
import { APICallerService } from '../shared/services/apicaller.service';
import { APIs } from '../shared/helper/APIs';

@Injectable({
  providedIn: 'root'
})
export class VillaService {

  constructor(private callApi:APICallerService) { }

  getAllVillas()
  {
    var result = this.callApi.get(APIs.Villa.List)
    return result;
  }

  getVillaDetails(villaId){
    var result = this.callApi.get(APIs.Villa.VillaDetails+'?villaId='+villaId)
    return result;
  }

  uploadVillaImage(formData){
    return this.callApi.postWithAttachment(APIs.Villa.AddAttachments,formData);
  }



}
