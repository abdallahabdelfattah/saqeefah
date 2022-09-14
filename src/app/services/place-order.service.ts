import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APICallerService } from '../shared/services/apicaller.service';

@Injectable({
  providedIn: 'root'
})
export class PlaceOrderService {
  constructor(private callApi : APICallerService) { }

  getplaceOrder():Observable<any>{
    return this.callApi.get(`api/Client/ClientInterest`)
  }
}
