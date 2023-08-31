import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProjectAndListService } from '../services/project-lists.service';
import { GenaricService } from '../services/Genaric.service';
import { changeLanguageService } from '../services/changeLanguage.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-project-villas',
  templateUrl: './project-villas.component.html',
  styleUrls: ['./project-villas.component.scss']
})
export class ProjectVillasComponent implements OnInit {

  OtherProjectsVillaType: any;
  projectDetails: any;
  appRootUrl=environment.appRoot;
  Gallery:[];
  filterVillas;
  id;
  constructor(private route: ActivatedRoute, private projectsServe: ProjectAndListService, private language: changeLanguageService) { }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoWidth: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    margin: 10,
    center: false,
    items: 3,
    navText: ['', ''],
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      }
    }
  }

  ngOnInit(): void {
    this.getProjectVillaTypeDetails();
    this.getProjectsVillaType();
  }

  getProjectsVillaType() {
    this.projectsServe.getAllProjects(this.language.getLanguageID()).subscribe((response: any) => {
      if (!response.isError) {
        this.OtherProjectsVillaType = response.result.data
        this.OtherProjectsVillaType = this.OtherProjectsVillaType.filter(x => x['statusId'] != 4 && x.projectType==2);
       // console.log(this.OtherProjectsVillaType);
      }
    })
  }

  getProjectVillaTypeDetails() {
    let projectId = this.route.snapshot.paramMap.get('id');
    this.id=projectId;
    console.log('project id', projectId)
    this.projectsServe.getProjectVillaTypeDetails(this.language.getLanguageID(), projectId).subscribe((response: any) => {
      console.log('res', response)
      if (!response.errors) {
        this.projectDetails = response?.data;
        this.filterVillas=this.projectDetails.villas;
        console.log(this.projectDetails);
      }
    })
  }

  filter(statusId){
    if(statusId)
    {
     this.filterVillas= this.projectDetails.villas.filter(a=>a.statusId==statusId);
    }else{
      this.filterVillas= this.projectDetails;
    }


  }
}
