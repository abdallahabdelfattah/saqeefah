import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APICallerService } from 'src/app/shared/services/apicaller.service';
import { IUser } from 'src/app/shared/services/IUser';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private callApi: APICallerService) {
  }

  getAllAdmin(): Observable<any> {
    return this.callApi.get(`api/Admin/AllAdmins`);
  }



  setAdmin(data:any):Observable<any>{
    return this.callApi.post(`api/Admin`, data);
  }
  updateAdmin(data:any){
   return this.callApi.put(`api/Admin`, data);
  }

  deleteAdmin(AdminId: number): Observable<any> {
     return this.callApi.post(`api/Admin/DeleteAdmin?AdminId=${AdminId}`,true)
   }

}
