import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { PlaceOrderService } from 'src/app/services/placeOrder.service';
import { ProjectAndListService } from 'src/app/services/project-lists.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {
propertyId:any
propertyDetails:any
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
  constructor(private route:ActivatedRoute, private property:ProjectAndListService,
    private toastr: ToastrService,
    private language:changeLanguageService,
    private service:PlaceOrderService) { }

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id');
    this.getPropertyDetails()
    this.initializeFormGroup();
  }
getPropertyDetails(){
this.property.getAppartmentDetails(this.propertyId).subscribe((res:any)=>{
if(!res.isError){
  this.propertyDetails = res.result.data; 
  if(this.propertyDetails.coverImage)
  {
   this.propertyDetails.images.push( {attachmentId:0, path:this.propertyDetails.coverImage});
  }
console.log('property',res)
this.initializeFormGroup();
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
  this.myFormGroup.patchValue({'project_Ref':this.propertyDetails?.project_Ref});
  this.myFormGroup.patchValue({'apartment_Ref':this.propertyDetails?.apartment_Id});

this.service.Post(this.myFormGroup.value).subscribe(res=>{
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
