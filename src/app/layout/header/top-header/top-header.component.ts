
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { siteInfo } from 'src/app/pages/Models/siteInfo';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { CompareService } from 'src/app/services/compare.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { SiteInformationSharedService } from 'src/app/services/site-information-shared.service';
import { siteInformationService } from 'src/app/shared/services/siteInformation.service';


@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit, AfterViewInit {
  siteInformation:siteInfo;
  constructor(public language:changeLanguageService,private translate: TranslateService,
    public favorite:FavoritesService, public compare:CompareService,
    private siteInfo:siteInformationService,private shared:SiteInformationSharedService) {
    translate.setDefaultLang('ar');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
   translate.use('ar');
   }

  ngOnInit(): void {
    this.compare.removeCompareNullValue()
   this.favorite.changeFavoriteStatus.subscribe((value)=>{
    this.favorite.checkFavoritesCounter()
   })
   this.compare.changeComparetatus.subscribe((value)=>{
    this.compare.removeCompareNullValue()
    this.compare.checkCompareCounter()
   })
  //  this.getAllSiteInformation();
  //  this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
  //   this.getAllSiteInformation();
   
  // });

  }
  ngAfterContentChecked() {
    this.siteInformation=this.shared.siteInformation;
    // console.log("shared data : ",this.shared.siteInformation)
  }
  // getAllSiteInformation(){
  //   this.siteInfo.getAllInformation(this.language.getLanguageID()).subscribe(x=>{
  
  //     if(!x.isError)
  //     {
  //       if(x.result['succeeded'])
  //       {
  //         this.siteInformation=x.result['data'];
  //       }
  //       else{
  
  //       }
  //     }
      
  //   })
  // }
  ngAfterViewInit(): void {
   
  }
 
changeLanguage(lang:string){
  this.language.changeLanguge(lang)
  this.translate.use(lang);
}
getPageLang(){

}
route(url:any){
  window.location.href=url;
}

}
