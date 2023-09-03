import { Component, OnInit } from '@angular/core';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { ProjectAndListService } from 'src/app/services/project-lists.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  view:string='grid3';
  Total=0;
  AllProperties:never[] = []
  filteredProperties:never[] = []

  constructor(private properties:ProjectAndListService,private language:changeLanguageService) { }

  getAllProperties(){
    this.properties.getAllProperties().subscribe((response:any)=>{


  if(!response.isError){
    this.AllProperties = response.result.data
    this.filteredProperties =  this.AllProperties
    this.Total=response.result.data.length;
  }
  this.sortByPrice('l2h');

    })
  }
  ngOnInit(): void {
    this.getAllProperties()
    this.language.changeLanguageStatus.subscribe((data)=>{
      this.getAllProperties()
    })
  }


  toggleView(view:string){
    if(view == 'grid3')
      this.view='grid3';
     if (view=='grid6')
     this.view='grid6';
     if (view == 'list')
     this.view='list';


   }

   filter(e){
    this.filteredProperties = e;

 }

 refresh(){
  window.location.reload();
 }


 sortAssending(value){
  if(value == 1) {
   this.AllProperties.sort((a:any, b:any) => a.price.localeCompare(b.price))

  } else {
 this.AllProperties.sort((a:any, b:any) => b.price.localeCompare(a.price))

  }

}

sortByPrice(option){
  if(option =='l2h'){
    this.filteredProperties.sort((a:any, b:any) => Number(a.apartment_Price) - Number(b.apartment_Price));
  }else if(option =='h2l'){
    this.filteredProperties.sort((a:any, b:any) => Number(b.apartment_Price) - Number(a.apartment_Price));
  }
}
sortPriceAssending(){
  this.filteredProperties.sort((a:any, b:any) => Number(a.apartment_Price) - Number(b.apartment_Price));

}
sortPriceDesinding(){
  this.filteredProperties.sort((a:any, b:any) => Number(b.apartment_Price) - Number(a.apartment_Price));

}


}
