import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PopupService  {
  constructor() { }
  appRootUrl = environment.appRoot+'/';
  makeCapitalPopup(data: any): string {
    return `` +
    
      `
      <a href="/project/${data.projectId}">
      <div class="card project-card" style="width:300px" routerLink="/about" >
      <div class="img-panel map-image-panel">
          <img src="${data.coverImage ? this.appRootUrl+data.coverImage : 'assets/images/home-placeHolder.webp'}" class="card-img-top" alt="...">
         
          <div class="card-label">${data.status}</div>
          <div class="card-mask"></div>
      </div>
      <div class="card-body">
          <div class="">
              <div class="row">
                  <div class="col-md-12">
                    
                      <h6>${data.projectName}</h6>
                      <h6>${data.city}</h6>
                  </div>
                  
              </div>
          
              
          </div>
         
      </div>
  </div>
      </a>
      `
  }
}