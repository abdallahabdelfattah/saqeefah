
import { Component, OnInit } from '@angular/core';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { GenaricService } from 'src/app/services/Genaric.service';
import { ProjectAndListService } from 'src/app/services/project-lists.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  constructor(private generalService:GenaricService, private properties:ProjectAndListService,private language:changeLanguageService) { }
  Allproperties:[] = []
  filteredProperties:[] = []
  getAllproperties(){
    this.properties.getAllProperties().subscribe((response:any)=>{
      this.Allproperties = response.result.data;
      this.filteredProperties=response.result.data;
    })
  }
  ngOnInit(): void {
    this.getAllproperties()
    this.language.changeLanguageStatus.subscribe((data)=>{
      this.getAllproperties()
    })
  }

  filter(e){
    this.filteredProperties = e;
  }


}
