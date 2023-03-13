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
        return `` +
            `
      <a href="/project/${data.projectId}" title="اعرض التفاصيل">
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

// [ngClass]="{'green': data.statusId== 1, 'orange': data.statusId== 2, 'pink': data.statusId== 3}"