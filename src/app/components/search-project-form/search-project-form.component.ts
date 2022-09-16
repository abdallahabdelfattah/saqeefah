
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { picklist } from 'src/app/pages/dashboard/setting/pages/website-info/website-info.component';
import { pickList } from 'src/app/pages/placeorder/placeorder.component';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { PlaceOrderService } from 'src/app/services/placeOrder.service';


@Component({
  selector: 'app-search-project-form',
  templateUrl: './search-project-form.component.html',
  styleUrls: ['./search-project-form.component.scss']
})
export class SearchProjectFormComponent implements OnInit {
  @Input() allProjects: any[];
  @Output() obj = new EventEmitter<{}>();
  FilteredProject?= [];
  public cities: pickList[] = [] as pickList[];
  public status: picklist[] = [] as picklist[];
  public districts: pickList[] = [] as picklist[];
  public form: FormGroup = new FormGroup({
    city: new FormControl('all'),
    district: new FormControl('all'),
    status: new FormControl('all')
  });
 
  constructor(private language: changeLanguageService
    ,private service:PlaceOrderService) {
  }

  ngOnInit(): void {
      this.loadCity();
      this.loadDistricts();

      this.loadStatus();
    this.language.changeLanguageStatus.subscribe((data) => {
      this.loadCity();
      this.loadStatus();
      this.loadDistricts();

      // this.loadDistricts(this.cities.filter(c=>c.value==this.form.value.city)[0]?.id);
    })
  }
  loadCity(){
    this.cities=[] as pickList[];
    this.service.getCitiesForFilter(this.language.getLanguageID()).subscribe(res=>{
      if(!res.isError)
      {
        if(res.result.data.length>0)
        {
          res.result.data.forEach(element => {
            let item:pickList={} as pickList;
            item.id=element.id
            item.value=element.name
            this.cities.push(item);
          });
          this.form.patchValue({city:this.cities[0].value});
        }
      }
      else{
      }
    })
  }
  loadStatus(){
    this.status=[] as pickList[];
    this.service.getAllProjectStatus(this.language.getLanguageID()).subscribe(res=>{
      if(!res.isError)
      {
        if(res.result.data.length>0)
        {
          res.result.data.forEach(element => {
            if(element.id!=4)
            {
              let item:pickList={} as pickList;
              item.id=element.id
              item.value=element.name
              this.status.push(item);
            }
         
          });
        }
      }
      else{
      }
    })

  }
  loadDistricts(){
    this.districts=[] as pickList[];
    this.service.getDistrictForFilter(this.language.getLanguageID()).subscribe(res=>{
      if(!res.isError)
      {
        if(res.result.data.length>0)
        {
          res.result.data.forEach(element => {
            let item:pickList={} as pickList;
            item.id=element.id
            item.value=element.name
            this.districts.push(item);
          });
        }
      }
      else{
      }
    })
  }
  ApplyFilterProject(){
      //numberOfUnits
      //numberOfBuildings
      //numberOFAvailableUnits
      //availableApartmentCount
      this.FilteredProject=[] ;
      this.FilteredProject=this.allProjects.filter(x=>{
     return (this.form.value.city=='all'?x:this.form.value.city==x.city)&&
        (this.form.value.district=='all'?x:this.form.value.district==x.district) &&
        (this.form.value.status=='all'?x:this.form.value.status==x.statusId) ;
      });
      this.obj.emit(this.FilteredProject);
  }
  cityChange(event){
    // this.loadDistricts(this.cities.filter(c=>c.value==event.target.value)[0].id);
    this.ApplyFilterProject();
  }
  clearFilter(){
      this.form.patchValue({
        city: this.cities[0].value,
        district: 'all',
        status:'all'
    })
      this.ApplyFilterProject();
  }
}
