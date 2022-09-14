import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class FavoritesService {
    changeFavoriteStatus = new EventEmitter<number>()
    constructor(){

    }
    getAllFavorites(){
        let currentFavoritesLocalStorage = window.localStorage.getItem('favorites')!
        if(currentFavoritesLocalStorage != null){
            let parsingFavorites = JSON.parse(currentFavoritesLocalStorage)
    
            return parsingFavorites
        }
        
    }
    checkFavoritesCounter(){
        let  favoritesOnLocalStorage = window.localStorage.getItem("favorites")
        if (favoritesOnLocalStorage === null) {
            return 0
        } else{
           let favoritesList =  JSON.parse(favoritesOnLocalStorage);
           return favoritesList.length
        }

    }
    checkFavorites(element:any){
        let currentFavoritesLocalStorage = window.localStorage.getItem('favorites')!
        if(currentFavoritesLocalStorage != null){
            let parsingFavorites = JSON.parse(currentFavoritesLocalStorage)
        if(element.projectId != undefined ){
            let checkEleOnFavorites = parsingFavorites.some((ele:any) => ele.projectId === element.projectId )
            if(checkEleOnFavorites){
                element.favorite = true
                
            } else {
                element.favorite = false
            }
        } else {
            let checkEleOnFavorites = parsingFavorites.some((ele:any) => ele.apartment_Id === element.apartment_Id )
            if(checkEleOnFavorites){
                element.favorite = true
            } else {
                element.favorite = false
            }
        }
        }
       
    }
    toggleFavorites(item:any){
        if(item.projectId != undefined){
            if(item.favorite){
            
                let currentFavoritesLocalStorage = window.localStorage.getItem('favorites')!
                let parsingFavorites = JSON.parse(currentFavoritesLocalStorage)
                let newFavoriteList= parsingFavorites.filter((fav:any)=> fav.projectId != item.projectId)
                window.localStorage.setItem("favorites",JSON.stringify(newFavoriteList))
                item.favorite = !item.favorite
                let selectedEle = document.querySelector(`[data-cardico-id='${item.projectId}']`)
                selectedEle?.classList.remove('active')
                this.changeFavoriteStatus.emit()
        } else {
            if (window.localStorage.getItem("favorites") === null) {
                window.localStorage.setItem("favorites",JSON.stringify([item]))
                item.favorite = !item.favorite
                let selectedEle = document.querySelector(`[data-cardico-id='${item.projectId}']`)
                selectedEle?.classList.add('active')
                this.changeFavoriteStatus.emit()

              } else {
                let currentFavoritesLocalStorage = window.localStorage.getItem('favorites')!
                let parsingFavorites = JSON.parse(currentFavoritesLocalStorage)
                let newFavoriteList= [...parsingFavorites,item]
                window.localStorage.setItem("favorites",JSON.stringify(newFavoriteList))
                item.favorite = !item.favorite
                let selectedEle = document.querySelector(`[data-cardico-id='${item.projectId}']`)
                selectedEle?.classList.add('active')
                this.changeFavoriteStatus.emit()

              }
            

        }
        } else {
            if(item.favorite){
            
                let currentFavoritesLocalStorage = window.localStorage.getItem('favorites')!
                let parsingFavorites = JSON.parse(currentFavoritesLocalStorage)
                let newFavoriteList= parsingFavorites.filter((fav:any)=> fav.apartment_Id != item.apartment_Id)
                window.localStorage.setItem("favorites",JSON.stringify(newFavoriteList))
                item.favorite = !item.favorite
                let selectedEle = document.querySelector(`[data-cardico-id='${item.apartment_Id}']`)
                selectedEle?.classList.remove('active')
                this.changeFavoriteStatus.emit()
        } else {
            if (window.localStorage.getItem("favorites") === null) {
                window.localStorage.setItem("favorites",JSON.stringify([item]))
                item.favorite = !item.favorite
                let selectedEle = document.querySelector(`[data-cardico-id='${item.apartment_Id}']`)
                selectedEle?.classList.add('active')
                this.changeFavoriteStatus.emit()

              } else {
                let currentFavoritesLocalStorage = window.localStorage.getItem('favorites')!
                let parsingFavorites = JSON.parse(currentFavoritesLocalStorage)
                let newFavoriteList= [...parsingFavorites,item]
                window.localStorage.setItem("favorites",JSON.stringify(newFavoriteList))
                item.favorite = !item.favorite
                let selectedEle = document.querySelector(`[data-cardico-id='${item.apartment_Id}']`)
                selectedEle?.classList.add('active')
                this.changeFavoriteStatus.emit()

              }
            

        }
        }
      
    }
    
    
}