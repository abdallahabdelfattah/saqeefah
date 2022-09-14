import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  propertyFavorites:any = []
  projectFavorites:any = []
  favoriteList:any = []

  constructor(public favorite:FavoritesService) { }

  ngOnInit(): void {
    this.getFavorites()
    this.favorite.changeFavoriteStatus.subscribe((value)=>{
      this.getFavorites()

     }
    )}

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
console.log( 'property favorites',this.propertyFavorites)
   }

}
