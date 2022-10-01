import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class PopupService {
    constructor() { }
    appRootUrl = environment.appRoot + '/';
    makeCapitalPopup(data: any): string {
        return `` +
            `
      <a href="/project/${data.projectId}" title="اعرض التفاصيل">
        <div class="map-card" routerLink="/about" >
            <div class="project-img">
                <img src="${data.coverImage ? this.appRootUrl + data.coverImage : 'assets/images/home-placeHolder.webp'}" class="card-img-top" alt="...">         
                <span class="project-status">${data.status}</span>
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