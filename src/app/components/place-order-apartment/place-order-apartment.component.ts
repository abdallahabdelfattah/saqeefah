import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { PlaceOrderService } from 'src/app/services/placeOrder.service';

@Component({
  selector: 'app-place-order-apartment',
  templateUrl: './place-order-apartment.component.html',
  styleUrls: ['./place-order-apartment.component.scss']
})
export class PlaceOrderApartmentComponent implements OnInit {

@Input() project_Ref
@Input() apartment_Id
public myFormGroup: FormGroup = new FormGroup({
  interest_Date:new FormControl(new Date(),[]),
  project_Ref: new FormControl(0, []), //project Id from api
   building_Ref: new FormControl(0, []),   
   apartment_Ref: new FormControl(0, []),    
  client_Name: new FormControl('', [Validators.required]), //user input
  client_Mail: new FormControl('', [Validators.email]),  //user input
  client_Mobile: new FormControl('', [Validators.required]), //user input
  city: new FormControl(0, []),      //city id from api
  district: new FormControl(0, []),  //destrictId from api
  payment_Method: new FormControl(0, []),  // payment method is from api
  price_Avg: new FormControl(0, []),
  space_Avg: new FormControl(0, []),
  bed_Room: new FormControl(0, []),
  parking: new FormControl(0, []),
  terace: new FormControl(0, []),
  balcony: new FormControl(0, []),
  roof: new FormControl(0, []),
  store: new FormControl(0, []),
  servent_Room: new FormControl(0, []),
  additional_Reqst: new FormControl('', [])
});

constructor(private toastr: ToastrService,
  private language:changeLanguageService,
  private placeOrderService:PlaceOrderService) { }

  ngOnInit(): void {
    this.initializeFormGroup();

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
    this.myFormGroup.patchValue({'project_Ref':this.project_Ref});
    this.myFormGroup.patchValue({'apartment_Ref':this.apartment_Id});
  
  this.placeOrderService.Post(this.myFormGroup.value).subscribe(res=>{
        if(!res.isError)
        {
          this.toastr.success(":: Successfully Updated")
          this.showError=false
          this.ngOnInit();
        }
        else{
          this.toastr.error(':: Failed Updated');
        }
  })
  } else {
   this.showError=true;
   this.toastr.warning(":: Please Correct your inputs")
  }
  }

}
