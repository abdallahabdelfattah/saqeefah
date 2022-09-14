import {  Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable()
export class GenaricService  {
  
    private data = new BehaviorSubject({transparentNav:false})
    data$ = this.data.asObservable();
    checkNavIsTRansparent():any{
       return this.data.getValue().transparentNav
        
    }
    changeNavBarTheme(data:any){
        this.data.next(data)
    }

    constructor() {


    }
 
}