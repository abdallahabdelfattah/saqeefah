import { Component, OnInit, Input } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { ProjectAndListService } from 'src/app/services/project-lists.service';
import { SiteInformationSharedService } from 'src/app/services/site-information-shared.service';
import { siteInformationService } from 'src/app/shared/services/siteInformation.service';
import { siteInfo } from '../../Models/siteInfo';

@Component({
  selector: 'app-recent-list',
  templateUrl: './recent-list.component.html',
  styleUrls: ['./recent-list.component.scss']
})
export class RecentListComponent implements OnInit {
 projects:any
 projectsForSale:any;
 projectsForSaleSoon:any;
siteInformation:siteInfo;




  constructor(private siteInfo:siteInformationService,private shared:SiteInformationSharedService,
    private language:changeLanguageService, private translate:TranslateService, private projectAndListService: ProjectAndListService) { }

  ngOnInit(): void {

    this.getAllProjects();
    this.language.changeLanguageStatus.subscribe((data) => {
      this.getAllProjects();
    })

    this.shared.siteInformationBS.subscribe(r => {
      this.siteInformation = r;
    });

  }
  ngAfterContentChecked() {
   // this.siteInformation=this.shared.siteInformation;
  }
  ngAfterViewInit(): void{
  }




  getAllProjects() {

    const startTime = new Date().getTime();
    this.projectAndListService.getFilteredProjects(this.language.getLanguageID(), 0/*both ready for sale and soon for sale*/).subscribe((response: any) => {
      this.projects = []
      this.projectsForSale = []
      this.projectsForSaleSoon = []
      if (response.succeeded) {
        const endTime = new Date().getTime();
        const diff = (endTime - startTime) / 1000 + 'Seconds';
       // alert(diff);
        this.projects = response.data
        this.projectsForSale = response.data?.filter((item: any) => item.statusId == 1)
        this.projectsForSaleSoon = response.data?.filter((item: any) => item.statusId == 2)
      }
    })
  }

}
