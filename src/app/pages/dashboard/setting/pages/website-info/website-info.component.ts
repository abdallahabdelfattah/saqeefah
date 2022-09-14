import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Editor, Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { adminSiteInfo, siteInfo } from 'src/app/pages/Models/siteInfo';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { SiteInformationSharedService } from 'src/app/services/site-information-shared.service';
import { siteInformationService } from 'src/app/shared/services/siteInformation.service';
import jsonDoc from '../../models/doc'

@Component({
  selector: 'app-website-info',
  templateUrl: './website-info.component.html',
  styleUrls: ['./website-info.component.scss']
})
export class WebsiteInfoComponent implements OnInit,OnDestroy  {

  siteInformations:adminSiteInfo[]=[] as adminSiteInfo[];
  items:picklist[]=[] as picklist[];
  public myFormGroup: FormGroup = new FormGroup({
    key: new FormControl('', [Validators.required]),
    valueAr: new FormControl('', [Validators.required]),
    valueEn: new FormControl('', [Validators.required]),
  });

  constructor(private toastr: ToastrService,private siteInformation:siteInformationService,
    private language:changeLanguageService,private translate:TranslateService,
    private shared:SiteInformationSharedService) { }

  ngOnInit(): void {
    this.getAllSiteInformation();
  }
  getAllSiteInformation(){
    this.siteInformation.getAllInformationforAdmin().subscribe(x=>{
      if(!x.isError)
      {
        if(x.result['succeeded'])
        {
          this.siteInformations=x.result['data'];
          this.siteInformations.forEach(element => {
            let i={} as picklist;
            i.id=element.key;
            i.value=element.key
            this.items.push(i);
            // this.language.getCurrentLanguage()=='ar'?i.value=element.valueAr:i.value=element.valueEn;
          });
          this.initializeFormGroup();
        }
        else{
        }
      }

    })
  }
  initializeFormGroup() {
    this.myFormGroup.setValue({
      key: '',
      valueAr: '',
      valueEn: '',
    })
  }

  onClickSubmit($event){
 if(this.myFormGroup.valid){
  let model = {
    key: this.myFormGroup.value.key,
    valueAr: this.myFormGroup.value.valueAr,
    valueEn: this.myFormGroup.value.valueEn,

  };
  this.siteInformation.postInformation(model).subscribe(res=>{
        if(!res.isError)
        {
          this.toastr.success(" Successfully Updated")
          this.ngOnInit();
        }
        else{
          this.toastr.error(' Failed Updated');
        }
  })
  } else {

  }
  }

  ngOnDestroy(): void {

  }
  onChange(event) {
    if(event.target.value!=""){
      let it=this.siteInformations.find(x=>x.key==event.target.value);
      this.myFormGroup.patchValue({valueAr:it.valueAr,valueEn:it.valueEn})
    ;
    }
}


}
export interface picklist{
  id:string;
  value:string;
}
