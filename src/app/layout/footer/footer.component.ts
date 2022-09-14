import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { siteInfo } from 'src/app/pages/Models/siteInfo';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { SiteInformationSharedService } from 'src/app/services/site-information-shared.service';
import { siteInformationService } from 'src/app/shared/services/siteInformation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  siteInformation:siteInfo;
  showError:boolean=false;
  spaceRegex=/^(\s+\S+\s*)*(?!\s).*$/;
  emailRegex=/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;

  form:FormGroup=new FormGroup({
    id:new FormControl(0),
    email:new FormControl('',[Validators.required,Validators.email,Validators.pattern(this.spaceRegex)]),
    subject: new FormControl('',[Validators.required,Validators.pattern(this.spaceRegex)]),
  })

  constructor(private FB:FeedbackService,private toastr :ToastrService,
    private language:changeLanguageService,
    private siteInfo:siteInformationService,
    private translate:TranslateService,
    private shared:SiteInformationSharedService) { }

  ngOnInit(): void {
    this.initializeForm();
    // this.getSiteInformation();
    // this.translate.onLangChange.subscribe((event: LangChangeEvent) => 
    // {
    //     this.getSiteInformation();
    // });
    

 
  }
  ngAfterContentChecked() {
    this.siteInformation=this.shared.siteInformation;
    // console.log("shared data : ",this.shared.siteInformation)
  }

// getSiteInformation(){
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
  onSubmit(){
    if (this.form.invalid) {

      this.showError=true;
      return;
    }

    let feedback = {
      email: this.form.value.email,
      subject: this.form.value.subject,

    };


    console.log(feedback)

    this.FB.setFeedback(feedback).subscribe(
      res => {
        if (!res.errors) {

          this.toastr.success(' Successfully Submitted ');
          this.showError=false;
          this.form.reset();
        }
        else {
          this.toastr.error(' Failed Submitted');
        }

      })


  }


  initializeForm(){
    this.form.setValue({
      id:0,
      email:'',
      subject:'',
    })
  }

}
