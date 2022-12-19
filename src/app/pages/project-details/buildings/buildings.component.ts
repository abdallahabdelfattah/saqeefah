import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})
export class BuildingsComponent implements OnInit, AfterViewInit {
  view:string='grid3';
  @Input() buildings:any
  @Input() activeBuilding:any
  filteredProperties:any[] = []
  propertIndex:number = 0
  propertyOfSelectedBuilding:any[]; 
  propertyOfSelectedBuildingForFilter:any[] = []
  getBuildingProperty(building){

    debugger
    if(this.buildings != undefined){
      if(building != undefined){
        let selectedBuild  = this.buildings.filter((item)=> item.build == building)
        
        this.propertyOfSelectedBuilding = selectedBuild[0].apartments
        this.propertyOfSelectedBuildingForFilter =  this.propertyOfSelectedBuilding;
        this.filteredProperties=this.propertyOfSelectedBuilding;
        this.activeBuilding = this.buildings[0].build
      } else {

        if(this.buildings.length>0)
        {
          this.propertyOfSelectedBuilding = this.buildings[0].apartments
          this.propertyOfSelectedBuildingForFilter =  this.propertyOfSelectedBuilding;
          this.filteredProperties=this.propertyOfSelectedBuilding;
        }
        
      
      
      }
    }

  }
  filter(e){
    this.filteredProperties = e;
  }
  constructor() { }

  ngOnInit(): void {
    // console.log('buildings', this.buildings)
  this.getBuildingProperty(this.activeBuilding)
  }
ngAfterViewInit(): void {
 
}
toggleView(view:string){
  if(view == 'grid3')
    this.view='grid3';
   if (view=='grid6')
   this.view='grid6';
   if (view == 'list')
   this.view='list';


 }
 refresh(){
  window.location.reload();
 }
}
