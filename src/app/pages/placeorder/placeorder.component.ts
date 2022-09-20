
import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { siteInfo } from 'src/app/pages/Models/siteInfo';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { PlaceOrderService } from 'src/app/services/placeOrder.service';
import { ProjectAndListService } from 'src/app/services/project-lists.service';
import { SettingTypes } from 'src/app/shared/Enums/enums';
import { siteInformationService } from 'src/app/shared/services/siteInformation.service';
import { ranges } from '../dashboard/setting/models/ranges';
import { SettingsService } from '../dashboard/setting/services/settings.service';

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.scss']
})



export class PlaceorderComponent implements OnInit,OnDestroy  {
  projects:pickList[]=[] as pickList[];
  paymentMethods:pickList[]=[] as pickList[];
  cities:pickList[]=[] as pickList[];
  districts:pickList[]=[] as pickList[];
  public priceCategory: pickList[] = [] as pickList[];
  public areaCategory: pickList[] = [] as pickList[];
  allAreaRanges: ranges[] = [] as ranges[];
  allPriceRanges: ranges[] = [] as ranges[];
  bannerPlaceOrderUrl
  bannerPlaceOrder

  public myFormGroup: FormGroup = new FormGroup({
    interest_Date:new FormControl(new Date(),[]),
    project_Ref: new FormControl(0,[]), //project Id from api
     building_Ref: new FormControl(0, []),   
     apartment_Ref: new FormControl(0, []),    
    client_Name: new FormControl('', [Validators.required]), //user input
    client_Mail: new FormControl('', [Validators.email]),  //user input
    client_Mobile: new FormControl('', [Validators.required]), //user input

    city: new FormControl(0, []),      //city id from api
    district: new FormControl(0, []),  //destrictId from api

    payment_Method: new FormControl(0,[]),  // payment method is from api

    price_Avg: new FormControl('all'),
    space_Avg: new FormControl('all'),
    bed_Room: new FormControl(0, []),


    parking: new FormControl(0,[]),
    terace: new FormControl(0, []),
    balcony: new FormControl(0, []),
    roof: new FormControl(0, []),
    store: new FormControl(0, []),
    servent_Room: new FormControl(0, []),

    additional_Reqst: new FormControl('', [])
  });


  constructor(private toastr: ToastrService,
    private scroll: ViewportScroller,
    public setting: SettingsService,
    private language:changeLanguageService,
    private service:PlaceOrderService,
    private projectAndListService:ProjectAndListService
    ) { }

  ngOnInit(): void {
    this.getPLaceSetting();
    this.loadProjects();
    this.loadCities();
    this.loadDistricts();
    this.loadPickList();
    this.loadPaymentMethods();
    this.initializeFormGroup();
  }
  loadCities(){
    this.service.getCitiesForFilter(this.language.getLanguageID()).subscribe(res=>{
      if(!res.isError)
      {
        if(res.result?.data.length>0)
        {
          res.result?.data.forEach(element => {
            let item:pickList={} as pickList;
            item.id=element.id
            item.value=element.name
            this.cities.push(item);
    
          });
        }
      }
      else{
        this.toastr.error(res.result?.message);
      }
    })
  }
  loadDistricts(){
    this.service.getDistrictForFilter(this.language.getLanguageID()).subscribe(res=>{
      if(!res.isError)
      {
        if(res.result?.data.length>0)
        {
          
          res.result.data.forEach(element => {
            let item:pickList={} as pickList;
            item.id=element.id
            item.value=element.name
            this.districts.push(item);
    
          });
        }
      }
      else{
        this.toastr.error(res.result?.message);
      }
    })
  }
  loadPaymentMethods(){
    this.service.getAllPaymentMethods(this.language.getLanguageID()).subscribe(res=>{
      if(!res.isError)
      {
        if(res.result?.data.length>0)
        {
          res.result?.data.forEach(element => {
            let item:pickList={} as pickList;
            item.id=element.id
            item.value=element.name
            this.paymentMethods.push(item);
    
          });
        }
      }
      else{
        this.toastr.error(res.result?.message);
      }
    })
  }

  loadProjects(){
    this.projectAndListService.getFilteredProjects(this.language.getLanguageID(),0).subscribe((res: any)=>{
      if (res.succeeded) {
        if (res.data.length > 0) {
          res.data.forEach(element => {
            let item: pickList = {} as pickList;
            item.id = element.projectId
            item.value = element.projectName
            this.projects.push(item);
          });
        }
      }
      else{
        this.toastr.error(res.result.message);
      }
    })
   
 
  }


  loadPickList() {
    this.priceCategory = [] as pickList[];
    this.areaCategory = [] as pickList[];

    this.service.getCategory(1, this.language.getLanguageID()).subscribe(res => {
      if (!res.isError) {
        if (res.result.data.length > 0) {
          this.allAreaRanges = res.result.data;
          res.result.data.forEach(element => {

            let item: pickList = {} as pickList;
            item.id = element.id
            item.value = element.name
            this.areaCategory.push(item);
          });
        }
      }
      else {
      }
    })
    this.service.getCategory(2, this.language.getLanguageID()).subscribe(res => {
      if (!res.isError) {
        if (res.result.data.length > 0) {
          this.allPriceRanges = res.result.data;
          res.result.data.forEach(element => {

            let item: pickList = {} as pickList;
            item.id = element.id
            item.value = element.name
            this.priceCategory.push(item);


          });
        }
      }
      else {
      }
    })
  }




  initializeFormGroup() {
    this.myFormGroup.setValue({
      interest_Date:new Date(),
      project_Ref: 0,
      building_Ref:0,
      apartment_Ref:0,
      client_Name: '',//
      client_Mobile: '',//
      client_Mail: '',//
      city:0,//
      district:0,
      payment_Method:0,
      price_Avg:0,//
      space_Avg:0,
      bed_Room:0,
      parking:0,
      terace:0,
      balcony:0,
      roof:0,
      store:0,
      servent_Room:0,

      additional_Reqst:''
    })
  }
  showError:boolean=false;
  onClickSubmit($event){
 if(this.myFormGroup.valid){
  this.service.Post(this.myFormGroup.value).subscribe(res=>{
        if(!res.isError)
        {
          this.toastr.success("Successfully Updated")
          this.showError=false
          this.ngOnInit();
        }
        else{
          this.toastr.error('Failed Updated');
        }
  })
  } else {
   this.showError=true;
   this.scroll.scrollToPosition([0,400]);
   this.toastr.warning("Please fill required data")

  }
  }

  ngOnDestroy(): void {
    // this.editor.destroy();

  }
  





get settingTypes() {
  return SettingTypes
}
// /////////////////////////////////

getPLaceSetting() {
  return this.setting.getAllsettings(this.language.getLanguageID()).subscribe((response) => {
    if (!response.isError) {
      let allSetting = response.result.data
      
      this.bannerPlaceOrder=allSetting.filter((a)=>a.settingTypeId==this.settingTypes.PlaceOrderBanar)[0]
      this.bannerPlaceOrderUrl=this.getUrl(this.setting.appRootUrl+this.bannerPlaceOrder?.imagePath);
    

    }
  })

}

getUrl(path: string) {
  path = path.replace(/[\/\\]/g, '/');
  path = path.replace(/ /g, '%20');
  return path;
}








}


export interface pickList{
  id:string;
  value:string;
}
