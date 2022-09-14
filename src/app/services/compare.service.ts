import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class CompareService {
    changeComparetatus = new EventEmitter<number>()
    constructor(){

    }
    getAllCompare(){

        let currentCompareLocalStorage = window.localStorage.getItem('Compare')!
        if(currentCompareLocalStorage != null){
        let parsingCompare = JSON.parse(currentCompareLocalStorage)
        return parsingCompare
        }


    }
    checkCompareCounter(){
        let  CompareOnLocalStorage = window.localStorage.getItem("Compare")
        if (CompareOnLocalStorage === null) {
            return 0
        } else{
           let CompareList =  JSON.parse(CompareOnLocalStorage);
           return CompareList.length
        }

    }
    deleteListFromCompare(id:any){

        let currentCompareLocalStorage = window.localStorage.getItem('Compare')!
        if(currentCompareLocalStorage != null){
                let parsingCompare = JSON.parse(currentCompareLocalStorage)
                let newCompareList= parsingCompare.filter((comp:any)=> comp != id)
                window.localStorage.setItem("Compare",JSON.stringify(newCompareList))
                this.changeComparetatus.emit()
        }
    }
    checkCompare(element:any){
        let currentCompareLocalStorage = window.localStorage.getItem('Compare')!
        if(currentCompareLocalStorage != null){
            let parsingCompare = JSON.parse(currentCompareLocalStorage)

            let checkEleOnCompare = parsingCompare.includes(element.apartment_Id)
            if(checkEleOnCompare){
                element.Compare = true
            } else {
                element.Compare = false
            }

        }

    }
    removeCompareNullValue(){
        let currentCompareLocalStorage = window.localStorage.getItem('Compare')!
        if(currentCompareLocalStorage != null){
            let parsingCompare = JSON.parse(currentCompareLocalStorage)
            let chechedCompare = parsingCompare.filter(item => item != null)
            window.localStorage.setItem("Compare",JSON.stringify(chechedCompare))
             
        }
    }
    toggleCompare(item:any){

            if(item.Compare){

                let currentCompareLocalStorage = window.localStorage.getItem('Compare')!
                let parsingCompare = JSON.parse(currentCompareLocalStorage)
                let newCompareList= parsingCompare.filter((comp:any)=> comp != item.apartment_Id)
                window.localStorage.setItem("Compare",JSON.stringify(newCompareList))
                item.Compare = !item.Compare
                let selectedEle = document.querySelector(`[data-cardCompico-id='${item.apartment_Id}']`)
                selectedEle?.classList.remove('active')
                this.changeComparetatus.emit()
        } else {
            if (window.localStorage.getItem("Compare") === null) {
                window.localStorage.setItem("Compare",JSON.stringify([item.apartment_Id]))
                item.Compare = !item.Compare
                let selectedEle = document.querySelector(`[data-cardCompico-id='${item.apartment_Id}']`)
                selectedEle?.classList.add('active')
                this.changeComparetatus.emit()

              } else {
                let currentCompareLocalStorage = window.localStorage.getItem('Compare')!
                let parsingCompare = JSON.parse(currentCompareLocalStorage)
                if(parsingCompare.length>0)
                {
                            let newCompareList= parsingCompare.filter((comp:any)=> (comp != null||comp!=''))
                            window.localStorage.setItem("Compare",JSON.stringify(newCompareList))
                }
                if(parsingCompare.length >2) {
                    alert('الحد الاقصى لمقارنة الوحدات 3 وحدات')
                } else {
                    let newCompareList= [...parsingCompare,item.apartment_Id]
                window.localStorage.setItem("Compare",JSON.stringify(newCompareList))
                item.Compare = !item.Compare
                let selectedEle = document.querySelector(`[data-cardCompico-id='${item.apartment_Id}']`)
                selectedEle?.classList.add('active')
                this.changeComparetatus.emit()
                }


              }


        }
        }}
