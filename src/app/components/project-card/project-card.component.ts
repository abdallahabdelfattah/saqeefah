import { Component, Input, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input() project:any
  @Input() EditMode!:boolean ;
  @Input() viewType:string;
  projectLink!:string;

  homespecs = [1,1]
  itemSpecsIcon = [
    {
      icon:true,
      src:'icon tagr-icon-building-line',
      type:'Buildings',
      count:'3'
    },
    {
      icon:true,
      src:'icon tagr-icon-home',
      type:'Apprtments',
      count:'60'
    }
  ]

  appRootUrl=environment.appRoot+'/';

  constructor(public favorites:FavoritesService) { }

  ngOnInit(): void {
    this.favorites.checkFavorites(this.project)
   // console.log('project from project-page',this.project)
   this.projectLink = this.EditMode  ? '../../project/' :"/project/";
  }

}
