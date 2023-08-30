import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/services/auth.service';
import { APICallerService } from '../shared/services/apicaller.service';
import { RequestMethod } from '../shared/Enums/enums';
import { APIs } from '../shared/helper/APIs';
@Injectable()
export class ProjectAndListService  {
     appRootUrl = environment.appRoot;
    constructor(private http:HttpClient, private getAuth:AuthService, private callApi:APICallerService) {
    }
     requestOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + this.getAuth.getToken(),
        'Accept': 'text/plain',
      }),
    };
    getAllProjects(languageId:string){
var result = this.callApi.get(`api/Project/ProjectsWithImagesAndVideos?languageId=${languageId}`)
return result;
    }
    getAllProperties(){
        var result = this.callApi.get(APIs.properties.List)
        return result;
            }
            getAppartmentDetails(appartmentId){
                var result = this.callApi.get(APIs.properties.apartmentDetails+'?apartmentId='+appartmentId)
                return result;
            }
    uploadProjectImage(formData){

       return this.callApi.postWithAttachment(APIs.projects.AddAttachments,formData);
    }
    uploadProjectMasterPlane(formData){
        return this.callApi.postWithAttachment(APIs.projects.AddMasterPlane,formData);

    }
    uploadProjectSpecifications(formData){
        return this.callApi.postWithAttachment(APIs.projects.addSpecifications,formData);

    }
    uploadpropertyImage(formData){
        return this.callApi.postWithAttachment(APIs.properties.AddAttachments,formData);

    }
    getProjectDetails(languageId:string,projectId:any){
        return this.http.get(`${this.appRootUrl}/api/Project/ProjectDetails?languageId=${languageId}&projectId=${projectId}`)
    }

    getProjectVillaTypeDetails(languageId:string,projectId:any){
      return this.http.get(`${this.appRootUrl}/api/Project/ProjectVillaDetails?languageId=${languageId}&projectId=${projectId}`)
  }


    getCompareAppartmens(compareArray:[]){
        return this.http.post(`${this.appRootUrl}/api/Apartment/CompareApartments`,{apartmentIds:compareArray})
    }
    getFilteredProjects(lang:any,filter:any){

        return this.http.get(`${this.appRootUrl}/api/Project/ProjectsWithImagesAndVideosWithFilteration?languageId=`+lang+"&filterId="+filter)
    }
}


