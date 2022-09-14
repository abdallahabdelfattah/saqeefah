import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user:string;
   email:string;
  constructor(private language:changeLanguageService,private router: Router, private auth: AuthService,private translate: TranslateService) {
  this.translate.setDefaultLang('ar');
    // this.translate.use('ar')

  }

  ngOnInit(): void {
    this.user=this.auth.getUsername();
    this.email=this.auth.getUseremail();
    let l =this.language.getCurrentLanguage();
    this.language.changeLanguge(l);
   this.translate.use(l);


    this.language.changeLanguageStatus.subscribe((data)=>{

      this.ngOnInit()
  console.log('language status from dashbao')

    })


  }

  logout(){

    this.auth.logoutUser();
    this.router.navigateByUrl('/login');

  }

}
