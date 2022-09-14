import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { SiteInformationSharedService } from 'src/app/services/site-information-shared.service';
import { siteInformationService } from 'src/app/shared/services/siteInformation.service';
import { siteInfo } from '../../Models/siteInfo';

@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.scss']
})
export class ParallaxComponent implements OnInit {

  siteInformation:siteInfo;
  constructor(public language:changeLanguageService,private translate: TranslateService,
    private siteInfo:siteInformationService,private shared : SiteInformationSharedService) {

   }

  ngOnInit(): void {
    // this.getAllSiteInformation();
    // this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    // this.getAllSiteInformation();
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

}
