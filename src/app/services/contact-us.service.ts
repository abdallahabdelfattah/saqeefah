import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../pages/contact/Model/contact';
import { APICallerService } from '../shared/services/apicaller.service';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  constructor(private callApi : APICallerService) { }

  setContact(Model:any): Observable<any> {
      return this.callApi.post(`api/Client/ContactUs`, Model);
  }
  getContact(): Observable<any> {
    return this.callApi.get(`api/Client/ContactUs`);
}
}
