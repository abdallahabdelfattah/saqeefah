import { Component, Input, OnInit } from '@angular/core';
import { CompareService } from 'src/app/services/compare.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent implements OnInit {
  @Input() property:any
  @Input() viewType:string;
  @Input() EditMode!:boolean 
  @Input() fromDetails!:boolean 
  propertyImageUrl:string;
  default= `assets/images/home-placeHolder.webp`
  propertyLink!:string
// itemSpecsIcon = [
//   {
//     icon:true,
//     src:'icon tagr-icon-meeting-room',
//     type:'Rooms',
//     count:'3'
//   },
//   {
//     icon:false,
//     src:'../../../assets/fonts/icons/bath.svg',
//     type:'Bathrooms',
//     count:'2'
//   },
//   {
//     icon:true,
//     src:'icon tagr-icon-kitchen',
//     type:'Kitchen',
//     count:'1'
//   },
//   {
//     icon:true,
//     src:'icon tagr-icon-couch',
//     type:'Furnished',
//     count:'1'
//   },
//   {
//     icon:true,
//     src:'icon tagr-icon-air-conditioner',
//     type:'Air Condition',
//     count:'4'
//   },
//   {
//     icon:false,
//     src:'../../../assets/fonts/icons/bed.svg',
//     type:'Beds',
//     count:'6'
//   },
// ]

   appRootUrl = environment.appRoot+'/';
  constructor(public favorites:FavoritesService, public compare:CompareService) { }
trueFalseIco(result){
  if(result == 1){
    
    return `<svg class="icon icon-checkmark"><use xlink:href="#icon-checkmark"></use></svg>`
  } else {
    return `<svg class="icon icon-cross"><use xlink:href="#icon-cross"></use></svg>`
  }
}
  ngOnInit(): void {
    this.favorites.checkFavorites(this.property)
     this.compare.checkCompare(this.property)
this.propertyLink = this.EditMode || this.fromDetails ? '../../property/' :"/property/";
     this.propertyImageUrl = this.property.coverImage? this.getUrl(this.appRootUrl+this.property?.coverImage):this.getUrl(this.default);
  }


  getUrl(path:string){
    path= path.replace(/[\/\\]/g,'/');
    path= path.replace(/ /g,'%20');
    return path;
  }

}
