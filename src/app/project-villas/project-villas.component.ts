import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProjectAndListService } from '../services/project-lists.service';
import { GenaricService } from '../services/Genaric.service';
import { changeLanguageService } from '../services/changeLanguage.service';


@Component({
  selector: 'app-project-villas',
  templateUrl: './project-villas.component.html',
  styleUrls: ['./project-villas.component.scss']
})
export class ProjectVillasComponent implements OnInit {

  AllProjects:any ;
  constructor( private generalService:GenaricService, private projects:ProjectAndListService,private language:changeLanguageService) { }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoWidth:true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:4000 ,
    margin:10,
    center:true,
    items:1,
    navText: ['', ''],
    nav: false,
    responsive:{
      0:{
          items:1,
      },
      600:{
          items:3,
      },
      1000:{
          items:3,
      }
  }
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(){
    this.projects.getAllProjects(this.language.getLanguageID()).subscribe((response:any)=>{
  if(!response.isError){
    this.AllProjects = response.result.data
    this.AllProjects=this.AllProjects.filter(x=>x['statusId']!=4);
  }

    })
  }


}
