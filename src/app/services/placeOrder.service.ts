import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { APICallerService } from '../shared/services/apicaller.service';
import { APIs } from '../shared/helper/APIs';
@Injectable()
export class PlaceOrderService  {
     appRootUrl = environment.appRoot;

    
    constructor(private callApi:APICallerService) {


    }


    getAllProjects(languageId:string){
        var result = this.callApi.get(`api/Project/GetProjects?languageId=${languageId}`,false)
        return result; 
    }
    getAllCities(languageId:string){
        var result = this.callApi.get(`api/Client/Cities?languageId=${languageId}`,false)
        return result; 
    }
    getCitiesForFilter(languageId:string){
        var result = this.callApi.get(`api/Client/CitiesForFilter?languageId=${languageId}`,false)
        return result; 
    }
    getDistrictForFilter(languageId:string){
        var result = this.callApi.get(`api/Client/DistrictsForFilter?languageId=${languageId}`,false)
        return result; 
    }
    getCategory(rangeType:any,languageId:string){
        var result = this.callApi.get(`api/Setting/GetRanges?rangeTypeId=${rangeType}&languageId=${languageId}`,false)
        return result; 
    }
    getAllApartmentStatus(languageId:string){
        var result = this.callApi.get(`api/Client/ApartmentStatus?languageId=${languageId}`,false)
        return result; 
    }
    getAllProjectStatus(languageId:string){
        var result = this.callApi.get(`api/Client/ProjectStatus?languageId=${languageId}`,false)
        return result; 
    }
    getAllDistricts(languageId:string,cityId:any){
        var result = this.callApi.get(`api/Client/Districts?languageId=${languageId}&cityId=${cityId}`,false)
        return result; 
    }
    getAllPaymentMethods(languageId:string){
        var result = this.callApi.get(`api/Client/PaymentMethods?languageId=${languageId}`,false)
        return result; 
    }
    Post(Model:any){
        debugger;
let Mod={
    interest_Date:Model.interest_Date,
    project_Ref: 0,
    building_Ref:0,
    apartment_Ref:Model.apartment_Ref,
    client_Name: Model.client_Name,//
    client_Mobile: Model.client_Mobile,//
    client_Mail: Model.client_Mail,//
    city:Model.city,//
    district:Model.district,
    payment_Method:Model.payment_Method,
    price_Avg:Model.price_Avg,//
    space_Avg:Model.space_Avg,
    bed_Room:Model.bed_Room,
    parking:Model.parking?1:0,
    terace:Model.terace?1:0,
    balcony:Model.balcony?1:0,
    roof:Model.roof?1:0,
    store:Model.store?1:0,
    servent_Room:Model.servent_Room?1:0,
    salon:Model.salon?1:0,
    backyard:Model.backyard?1:0,
    fron_view:Model.Front_view?1:0,
    p_intrance:Model.p_Intrance?1:0,

    additional_Reqst:Model.additional_Reqst
};
        var result = this.callApi.post(`api/Client/ClientInterest`,Mod,false)
        return result; 
    }



    // uploadProjectImage(formData){
        
    //    return this.callApi.postWithAttachment(APIs.projects.AddAttachments,formData); 
    // }



}
   

