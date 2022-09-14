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
export class TestService {


  getList() :Observable<Result<ITestItemResponses>>{
    const apiPath =
    APIs.Building.GetBuildings;
    return this.apiCaller.get(apiPath,false); 
  }

  constructor(
    private apiCaller: APICallerService
  ) {}







  
}
