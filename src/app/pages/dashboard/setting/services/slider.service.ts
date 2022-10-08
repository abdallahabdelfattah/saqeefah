import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/services/BaseResponse';
import { Result } from 'src/app/shared/services/Result';
import { environment } from 'src/environments/environment';
import { APICallerService } from '../../../../shared/services/apicaller.service';
import { ISlider, ISliderResponses } from '../models/slider.interface';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private callApi: APICallerService) {
  }

  getAllSliderByid(sliderId: number): Observable<Result<ISliderResponses>> {
    return this.callApi.get(`api/Slider/GetslidersByIdForAdmin?sliderId=${sliderId}`);
  }



  getAllSliderByidForUser(sliderId: number, languageId: any): Observable<Result<ISliderResponses>> {
    return this.callApi.get(`api/Slider/GetslidersById?sliderId=${sliderId}&languageId=${languageId}`);
  }
  
  getAllSliders(languageId: any): Observable<any> {
    
    return this.callApi.get(`api/Slider?languageId=${languageId}`)
  }


  UpdateSlider(body: ISlider): Observable<any> {
    var formdata = new FormData();
    formdata.append("Id", body.id.toString());
    formdata.append("IsActive", body.isActive ? "true" : "false");
    formdata.append("TitleAr", body.titleAr);
    formdata.append("TitleEn", body.titleEn);
    formdata.append("DescriptionAr", body.descriptionAr);
    formdata.append("DescriptionEn", body.descriptionEn);
    return this.callApi.postFormData(`api/Slider/Editslider`, formdata)
  }

  AddHomeSlider(formdata : any): Observable<any> {
    // var formdata = new FormData();
    // formdata.append("Id", body.id.toString());
    // formdata.append("TitleAr", body.titleAr);
    // formdata.append("TitleEn", body.titleEn);
    // formdata.append("DescriptionAr", body.descriptionAr);
    // formdata.append("DescriptionEn", body.descriptionEn);
    return this.callApi.postFormData(`api/Slider/SliderHomeBanarAttachments`, formdata)
  }
 
  deleteSliderAttachment(id: any): Observable<Result<BaseResponse>> {
   let attachmentsIds=[]; 
   attachmentsIds.push(id); 
    return this.callApi.post(`api/Slider/DeleteAttachments`, {attachmentsIds})
  }


  uploadAttachmentImagesSlider(formData: any): Observable<Result<BaseResponse>> {
    return this.callApi.postWithAttachment(`api/Slider/Attachments`, formData); 
  }
  


}
