
import { Component, OnInit } from '@angular/core';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { GenaricService } from 'src/app/services/Genaric.service';
import { ProjectAndListService } from 'src/app/services/project-lists.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private generalService:GenaricService, private projects:ProjectAndListService,private language:changeLanguageService) { }
  AllProjects:[] = []
  getAllProjects(){
    this.projects.getAllProjects(this.language.getLanguageID()).subscribe((response:any)=>{

      debugger; 
      console.log('all projects',response)
    
      
      this.AllProjects = response.result.data
     
  
    })
  }
  ngOnInit(): void {
    this.getAllProjects()
    this.language.changeLanguageStatus.subscribe((data)=>{
      this.getAllProjects()
    })
  }

}
