import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';
import { SiteInformationSharedService } from 'src/app/services/site-information-shared.service';
import { siteInfo } from '../Models/siteInfo';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  propertyFavorites:any = []
  projectFavorites:any = []
  favoriteList:any = []
   siteInformation:siteInfo
  constructor(public favorite:FavoritesService, private shared:SiteInformationSharedService) { }

  ngOnInit(): void {
    this.shared.siteInformationBS.subscribe(r => {
      this.siteInformation = r;
    });
    this.getFavorites()
    this.favorite.changeFavoriteStatus.subscribe((value)=>{
      this.getFavorites()

     }
    )}
    ngAfterContentChecked() {
      //this.siteInformation=this.shared.siteInformation;
    }
   getFavorites(){
    this.propertyFavorites = []
  this.projectFavorites = []
    let allFavorites = this.favorite.getAllFavorites()

   if(allFavorites != undefined){
    allFavorites.map((item:any) => {
      if(item.projectId != undefined){
        this.projectFavorites.push(item)
      } else {
        this.propertyFavorites.push(item)
      }
    } )
   }

   }

}
