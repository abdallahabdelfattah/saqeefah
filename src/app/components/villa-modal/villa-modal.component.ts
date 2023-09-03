import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/pages/dashboard/setting/services/settings.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-villa-modal',
  templateUrl: './villa-modal.component.html',
  styleUrls: ['./villa-modal.component.scss']
})
export class VillaModalComponent implements OnInit {

  @Input() Gallery: any[]
  @Input() modalId: string
  @Input() villa: any;
  GalleryImages;
  default = `assets/images/home-placeHolder.webp`
  constructor(public setting: SettingsService) { }
//  appRootUrl = environment.appRoot;
  ngOnInit(): void {
    this.Gallery.forEach(element => {
    element.path=this.getUrl(this.setting.appRootUrl +element.path);
    });
  }
  getUrl(path:string){
    path= path.replace(/[\/\\]/g,'/');
    path= path.replace(/ /g,'%20');
    return path;
  }


}
