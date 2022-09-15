import { AfterViewInit, Component,HostListener,OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { changeLanguageService } from './services/changeLanguage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BusyService } from './pages/dashboard/services/busy.service';
import { SiteInformationSharedService } from './services/site-information-shared.service';
import { AllSettingSharedService } from './services/all-setting-shared.service';
import { ViewportScroller } from '@angular/common';
import { AnimationEvent } from "@angular/animations";
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

  animations:[
    trigger('fadeInOut',[
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(300)),
    ])

  ]
})
export class AppComponent implements OnInit,AfterViewInit {
  title = 'saqeefah';
  contentMargin = 240;

  pageYoffset = 0;
  @HostListener('window:scroll', ['$event']) onScroll(event:any){
    this.pageYoffset = window.pageYOffset;
  }

constructor(public translate: TranslateService,private lang:changeLanguageService  ,private scroll: ViewportScroller,
   private loader : BusyService,private shared:SiteInformationSharedService,private settingShared:AllSettingSharedService){
this.loader.busy();
}
ngOnInit(): void {

  this.lang.changeLanguge(environment.lang);
  // this.shared.updateSiteInformation();
  this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    this.shared.updateSiteInformation();
    // this.settingShared.updateAllSetting();

    });

  // this.translate.use(environment.lang)
}

  ngAfterViewInit() {
    this.loader.idle();
  }

  scrollToTop(){

    this.scroll.scrollToPosition([0,0]);
    }

}
