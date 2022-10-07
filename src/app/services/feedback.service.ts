import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../layout/Model/feedback';
import { APICallerService } from '../shared/services/apicaller.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private callApi : APICallerService) { }

  setFeedback(Model:any): Observable<any> {
    console.log(Model);
      return this.callApi.post(`api/Client/Feedback`, Model)
  }
  getFeedback():Observable<any>{
    return this.callApi.get(`api/Client/Feedback`)
  }

}
