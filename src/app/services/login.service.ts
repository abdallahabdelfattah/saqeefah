import { Injectable } from '@angular/core';
import { APICallerService } from '../shared/services/apicaller.service';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService  {
  constructor(private service:APICallerService) { }
 
  public login(Model:any){
    return this.service.post("api/Admin/Login",Model,false);
  }
}