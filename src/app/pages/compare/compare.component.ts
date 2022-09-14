import { Component, OnInit } from '@angular/core';
import { CompareService } from 'src/app/services/compare.service';
import { ProjectAndListService } from 'src/app/services/project-lists.service';
import { environment } from 'src/environments/environment';
import { compare } from '../Models/Compare';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
compareList:compare[] = [] as compare[];
compareAvalable!:boolean ;
  constructor(private appartments:ProjectAndListService, public compareServ:CompareService) { }

  ngOnInit(): void {
    this.getCompareList()
    this.compareServ.changeComparetatus.subscribe((value)=>{
      this.getCompareList()

   })
  }
getCompareList(){
  let currentCompareLocalStorage = window.localStorage.getItem('Compare')!
  if(currentCompareLocalStorage != null){
  let parsingCompare = JSON.parse(currentCompareLocalStorage)
  if(parsingCompare.length > 0){
    this.compareAvalable = true
    this.appartments.getCompareAppartmens(parsingCompare).subscribe((item:any)=>{
      this.compareList = item.data
      console.log(item)
    })
  } else {
    this.compareAvalable = false
  }
}else {
  this.compareAvalable = false
}
}

appRootUrl=environment.appRoot+'/';
getKeys(){
  let returned:any;
  if(this.compareList.length>0)
      returned= Object.keys(this.compareList[0]);

      return returned;
}
}
