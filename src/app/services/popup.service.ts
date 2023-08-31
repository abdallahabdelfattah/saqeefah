import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class PopupService {
    constructor() { }
    appRootUrl = environment.appRoot + '/';
    makeCapitalPopup(data: any): string {
        let status_icon= data.statusId== 1?`<span class="project-status green">${data.status}</span>`:data.statusId== 2?`<span class="project-status orange">${data.status}</span>`:`<span class="project-status pink">${data.status}</span>`
        let url =`/project/${data.projectId}`;
        if(data.projectType==2)
        {
          url=`/project-villas/${data.projectId}`;
        }
        return `` +
            `
      <a href=${url}  title="اعرض التفاصيل">
        <div class="map-card" routerLink="/about" >
            <div class="project-img">
                <img src="${data.coverImage ? this.appRootUrl + data.coverImage : 'assets/images/home-placeHolder.webp'}" class="card-img-top" alt="...">
                ${status_icon}
            </div>
            <div class="project-info">
                <h6 class="project-title">${data.projectName}</h6>
                <h6 class="project-city">${data.city}</h6>
            </div>
        </div>
      </a>
      `
    }




}
