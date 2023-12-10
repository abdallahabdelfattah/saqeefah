import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProjectAndListService } from '../services/project-lists.service';
import { GenaricService } from '../services/Genaric.service';
import { changeLanguageService } from '../services/changeLanguage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-project-villas',
  templateUrl: './project-villas.component.html',
  styleUrls: ['./project-villas.component.scss']
})
export class ProjectVillasComponent implements OnInit {

  OtherProjectsVillaType: any;
  projectDetails: any;
  appRootUrl = environment.appRoot;
  Gallery: [];
  filterVillas;
  DataForMap: any;
  SelectedFilter = 0;
  projectId = "0";
  constructor(private activatedRoute: ActivatedRoute,
    private projectsServe: ProjectAndListService,
    private language: changeLanguageService,
    private router: Router

  ) { }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoWidth: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 6000,
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
    this.getProjectVillaTypeDetailsForMap();
    this.getProjectVillaTypeDetails();
    this.getProjectsOther();
  }

  getProjectsOther() {
    this.projectsServe.getAllProjects(this.language.getLanguageID()).subscribe((response: any) => {
      if (!response.isError) {
        this.OtherProjectsVillaType = response.result.data
        this.OtherProjectsVillaType = this.OtherProjectsVillaType.filter(x => x['statusId'] != 4 && x["projectId"] != this.projectId);

      }
    })
  }

  getProjectVillaTypeDetails() {
    let projectId = this.activatedRoute.snapshot.paramMap.get('id');
    this.projectId = projectId;
    this.projectsServe.getProjectVillaTypeDetails(this.language.getLanguageID(), projectId).subscribe((response: any) => {
      if (!response.errors) {
        this.projectDetails = response?.data;
        this.filterVillas = this.projectDetails.villas;
      }
    })
  }


  getProjectVillaTypeDetailsForMap() {
    let projectId = this.activatedRoute.snapshot.paramMap.get('id');
    let subscribeData = this.projectsServe.getProjectVillaTypeDetails(this.language.getLanguageID(), projectId);
    this.DataForMap = subscribeData;

  }

  filter(statusId) {
    if (statusId && statusId != 0) {
      this.filterVillas = this.projectDetails.villas.filter(a => a.statusId == statusId);

    } else {
      this.filterVillas = this.projectDetails.villas;
    }
    this.SelectedFilter = statusId;

  }

  handleClickEvent(_project): void {
    if (_project["type"] == "2") {
      this.router.navigate(['/project-villas', _project.projectId]);
    } else {
      this.router.navigate(['/project', _project.projectId]);
    }

  }

}
