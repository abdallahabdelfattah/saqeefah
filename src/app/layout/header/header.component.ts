import {  Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { GenaricService } from 'src/app/services/Genaric.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

nav = {
  navtransparentMode:false
}
  home = [1,1,1,1,1,1,1,1]
  constructor(public language:changeLanguageService,private translate: TranslateService,
    public generalService:GenaricService
    ) {
      translate.setDefaultLang('ar');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
     translate.use('ar');
   }

  ngOnInit(): void {
    this.nav.navtransparentMode = this.generalService.checkNavIsTRansparent();
this.changeLanguage(this.language.getCurrentLanguage())
  }

changeLanguage(lang:string){
  this.language.changeLanguge(lang)
  this.translate.use(lang);

}

}
