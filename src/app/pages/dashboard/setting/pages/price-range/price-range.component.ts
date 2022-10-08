import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Editor, Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { adminSiteInfo, siteInfo } from 'src/app/pages/Models/siteInfo';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { SiteInformationSharedService } from 'src/app/services/site-information-shared.service';
import { siteInformationService } from 'src/app/shared/services/siteInformation.service';
import { ConfirmationDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';
import jsonDoc from '../../models/doc'
import { ranges } from '../../models/ranges';
import { PriceRangeService } from '../../services/priceRange.service';

@Component({
  selector: 'app-price-range',
  templateUrl: './price-range.component.html',
  styleUrls: ['./price-range.component.scss']
})
export class PriceRangeComponent implements OnInit,OnDestroy  {

  ranges:ranges[]=[] as ranges[];
  public myFormGroup: FormGroup = new FormGroup({
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
    nameAr: new FormControl('', [Validators.required]),
    nameEn: new FormControl('', [Validators.required]),
    rangeTypeId: new FormControl('', []),
  });

  constructor(private toastr: ToastrService,private siteInformation:PriceRangeService,private modalService: NgbModal,
    private language:changeLanguageService,private translate:TranslateService) { }

  ngOnInit(): void {
    this.initializeFormGroup();
    this.getAllRanges();
  }
  getAllRanges(){
    this.siteInformation.getAllPriceRanges(2).subscribe(x=>{
      console.log(x)
      if(!x.isError)
      {
        if(x.result['succeeded'])
        {
          this.ranges=x.result['data'];
        }
        else{
        }
      }

    })
  }
  initializeFormGroup() {
    this.myFormGroup.setValue({
      from: '',
      to: '',
      nameAr: '',
      nameEn: '',
      rangeTypeId: '',

    })
  }

  onClickSubmit($event){
 if(this.myFormGroup.valid){
  let model = {
    from: this.myFormGroup.value.from,
    to: this.myFormGroup.value.to,
    nameAr: this.myFormGroup.value.nameAr,
    nameEn: this.myFormGroup.value.nameEn,
    rangeTypeId: 2
  };
  this.siteInformation.setPriceRange(model).subscribe(res=>{
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
  deleteRange(id){
    this.modalService.open(ConfirmationDialogComponent, { size: 'sm' }).closed.subscribe(res => {
      if (res) {
    this.siteInformation.delete(id,2).subscribe(res=>{
      if(!res.isError)
      {

        this.toastr.success('successfully Deleted');
        this.ngOnInit();
      }
      else{
        this.toastr.error(' Failed Deleted');
      }


    })
  }
  else{

  }
})
  }
  // onChange(event) {
  //   if(event.target.value!=""){
  //     let it=this.siteInformations.find(x=>x.key==event.target.value);
  //     this.myFormGroup.patchValue({valueAr:it.valueAr,valueEn:it.valueEn})
  //   ;
  //   }
// }


}
