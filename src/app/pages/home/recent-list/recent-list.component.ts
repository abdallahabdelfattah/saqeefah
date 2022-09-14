import { Component, OnInit, Input } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { SiteInformationSharedService } from 'src/app/services/site-information-shared.service';
import { siteInformationService } from 'src/app/shared/services/siteInformation.service';
import { siteInfo } from '../../Models/siteInfo';

@Component({
  selector: 'app-recent-list',
  templateUrl: './recent-list.component.html',
  styleUrls: ['./recent-list.component.scss']
})
export class RecentListComponent implements OnInit {
@Input() projects:any
@Input() projectsForSale:any;
@Input() projectsBooked:any;
@Input() projectsForSaleSoon:any;
@Input() isHome:boolean=false;
@Input() isAbout:boolean=false;
siteInformation:siteInfo;




  constructor(private siteInfo:siteInformationService,private shared:SiteInformationSharedService,
    private language:changeLanguageService, private translate:TranslateService) { }

  ngOnInit(): void {
// this.getAllSiteInformation();
//     this.translate.onLangChange.subscribe((event: LangChangeEvent) => 
//     {
// this.getAllSiteInformation();
      
//     }); 
    

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
        
  //     }
      
  //   })
  // }
  ngAfterViewInit(): void{

  }
}
