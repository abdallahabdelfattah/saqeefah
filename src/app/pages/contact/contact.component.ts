import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { ContactUsService } from 'src/app/services/contact-us.service';
import { SiteInformationSharedService } from 'src/app/services/site-information-shared.service';
import { siteInformationService } from 'src/app/shared/services/siteInformation.service';
import { siteInfo } from '../Models/siteInfo';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  showError:boolean=false;
  emailRegex=/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
  spaceRegex=/^(\s+\S+\s*)*(?!\s).*$/;
  phoneregex='(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})'
  form: FormGroup= new FormGroup({
    id: new FormControl(0),
    name:new FormControl('', [Validators.required]),
    email:new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    message:new FormControl('', [Validators.required])
  })
  siteInformation:siteInfo;


  constructor(private contact:ContactUsService ,private toastr : ToastrService,private shared:SiteInformationSharedService,
    private siteInfo:siteInformationService,private language:changeLanguageService, private translate:TranslateService) { }

  ngOnInit(): void {
    this.initializeForm();
    // this.getAllSiteInformation();
    // this.translate.onLangChange.subscribe((event: LangChangeEvent) => 
    // {
    //  this.getAllSiteInformation();
      
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
  //     }
      
  //   })
  // }
  onSubmit(){
    if (this.form.invalid) {
      this.showError=true;
      return;
    }

    let contact = {
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone,
      message: this.form.value.message,

    };


    this.contact.setContact(contact).subscribe(
      res => {

        if (!res.isError) {

          this.toastr.success(' :: Successfully Sended ');
          this.showError=false;
          this.form.reset();

        }
        else {
          this.toastr.error(' :: Failed Sended ');
        }

      })



  }


  initializeForm(){
    this.form.setValue({
      id:0,
      name:'',
      email:'',
      phone:'',
      message:''
    })
  }

}
