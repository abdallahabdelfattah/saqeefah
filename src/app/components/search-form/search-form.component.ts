import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { pickList } from 'src/app/pages/placeorder/placeorder.component';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import { PlaceOrderService } from 'src/app/services/placeOrder.service';
import { ProjectAndListService } from 'src/app/services/project-lists.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  // @Input() search: any;
  // @Input() searchAbout: any;
  // @Input() propList: any;
  @Input() allProp: any[];
  @Input() searchInallProjects: boolean = true;




  @Output() obj = new EventEmitter<{}>();
  // AllProjects: [] = []
  // AllProperties: [] = [];
  // FilteredProject?= [];
  FilteredProperty = [];
  allAreaRanges: ranges[] = [] as ranges[];
  allPriceRanges: ranges[] = [] as ranges[];

  minPrice: any;
  maxPrice: any;
  // priceStep:any;
  minArea: any;
  maxArea: any;
  // areaStep:any;
  // public cities: string[] = [];
  // public status: string[] = [];
  // public districts: string[] = [];
  // public prices:string[] = [];
  // public statusProp: string[] = [];
  public projects: pickList[] = [] as pickList[];
  public apartmentsStatus: pickList[] = [] as pickList[];
  public priceCategory: pickList[] = [] as pickList[];
  public areaCategory: pickList[] = [] as pickList[];


  public form: FormGroup = new FormGroup({
    projectId: new FormControl('all'),
    status: new FormControl('all'),
    price: new FormControl('all'),
    totalArea: new FormControl('all'),
    internalStation: new FormControl(null),
    bedroom: new FormControl(null),
    dressRoom: new FormControl(null),
    serventRoom: new FormControl(null),
    store: new FormControl(null),
    roof: new FormControl(null),
    salon: new FormControl(null),
    p_Intrance: new FormControl(null)
  });
  constructor(private projectsService: ProjectAndListService, private language: changeLanguageService
    , private service: PlaceOrderService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.clearFilter();
  }
  ngOnInit(): void {
    if (this.searchInallProjects)
      this.loadProjects();
    this.loadPickList();

    this.loadStatus();
    // this.minPrice=environment.minPrice;
    // this.maxPrice=environment.maxprice;
    // this.priceStep=environment.priceStep;
    // this.minArea=environment.minArea;
    // this.maxArea=environment.maxArea;
    // this.areaStep=environment.areaStep;
    this.language.changeLanguageStatus.subscribe((data) => {
      if (this.searchInallProjects)
      this.loadProjects();
      this.loadStatus();
      this.loadPickList();
      // this.getAllProperties();
    })
  }

  loadProjects() {
    this.projects = [] as pickList[];
    this.projectsService.getFilteredProjects(this.language.getLanguageID(), 0).subscribe((response: any) => {
      if (response.succeeded) {
        if (response.data.length > 0) {
          response.data.forEach(element => {
            let item: pickList = {} as pickList;
            item.id = element.projectId
            item.value = element.projectName
            this.projects.push(item);
          });
        }
      }
    })
  }

  loadStatus() {
    this.apartmentsStatus = [] as pickList[];
    this.service.getAllApartmentStatus(this.language.getLanguageID()).subscribe(res => {
      if (!res.isError) {
        if (res.result.data.length > 0) {

          res.result.data.forEach(element => {
            if (element.id != 2 && element.id != 3) {
              let item: pickList = {} as pickList;
              item.id = element.id
              item.value = element.name
              this.apartmentsStatus.push(item);
            }

          });
          this.form.patchValue({ status: 1 });//متاح
        }
      }
      else {
      }
    })
  }
  loadPickList() {
    this.priceCategory = [] as pickList[];
    this.areaCategory = [] as pickList[];

    this.service.getCategory(1, this.language.getLanguageID()).subscribe(res => {
      if (!res.isError) {
        if (res.result.data.length > 0) {
          this.allAreaRanges = res.result.data;
          res.result.data.forEach(element => {

            let item: pickList = {} as pickList;
            item.id = element.id
            item.value = element.name
            this.areaCategory.push(item);
          });
        }
      }
      else {
      }
    })
    this.service.getCategory(2, this.language.getLanguageID()).subscribe(res => {
      if (!res.isError) {
        if (res.result.data.length > 0) {
          this.allPriceRanges = res.result.data;
          res.result.data.forEach(element => {

            let item: pickList = {} as pickList;
            item.id = element.id
            item.value = element.name
            this.priceCategory.push(item);


          });
        }
      }
      else {
      }
    })
  }
  changeRange(type: number) {

    if (type == 1) {
      if (this.form.value.price == 'all') {
        this.ApplyFilterProperty();
      }
      else {
        let item = this.allPriceRanges.filter(x => x.id == this.form.value.price)[0];
        this.minPrice = item.from;
        this.maxPrice = item.to;
        this.ApplyFilterProperty();
      }

    }
    else {
      if (this.form.value.totalArea == 'all') {
        this.ApplyFilterProperty();
      }
      else {
        let item = this.allAreaRanges.filter(x => x.id == this.form.value.totalArea)[0];
        this.minArea = item.from;
        this.maxArea = item.to;
        this.ApplyFilterProperty();
      }

    }
  }
  ApplyFilterProperty() {
    // let minPrice=this.form.value.price-environment.priceRange;
    // let maxPrice=this.form.value.price+environment.priceRange;
    // let minArea=this.form.value.totalArea-environment.areaRange;
    // let maxArea=this.form.value.totalArea+environment.areaRange;
    this.FilteredProperty = [];


    
    this.FilteredProperty = this.allProp.filter(x => {

      // return (this.form.value.projectId == 'all' && this.searchInallProjects ? x.project_Ref : this.form.value.projectId == x.project_Ref) &&
      //   (this.form.value.price == 'all' ? x : (x.apartment_Price >= this.minPrice && x.apartment_Price <= this.maxPrice)) &&
      //   (this.form.value.totalArea == 'all' ? x : ((x.apartment_Space + x.additional_Space + x.basic_Space) >= this.minArea && (x.apartment_Space + x.additional_Space + x.basic_Space) <= this.maxArea)) &&
      //   (this.form.value.bedroom == null ? x.bed_Room_Num : this.form.value.bedroom == x.bed_Room_Num) &&
      //   (this.form.value.internalStation == null ? x : this.form.value.internalStation == x.parking) &&
      //   (this.form.value.serventRoom == null ? x : this.form.value.serventRoom == x.servant_Room) &&
      //   (this.form.value.store == null ? x : this.form.value.store == x.store) &&
      //   (this.form.value.roof == null ? x : this.form.value.roof == x.roof) &&
      //   (this.form.value.salon == null ? x : this.form.value.salon == x.salon) &&
      //   (this.form.value.p_Intrance == null ? x : this.form.value.p_Intrance == x.p_Intrance) 
      //   && (this.form.value.status == 'all' ? x.statusId : this.form.value.status == x.statusId);
       return (this.form.value.projectId == 'all' && this.searchInallProjects ? x.project_Ref : this.form.value.projectId == x.project_Ref) &&
         (this.form.value.price == 'all' ? x : (x.apartment_Price >= this.minPrice && x.apartment_Price <= this.maxPrice)) &&
        (this.form.value.totalArea == 'all' ? x : ((x.apartment_Space + x.additional_Space + x.basic_Space) >= this.minArea && (x.apartment_Space + x.additional_Space + x.basic_Space) <= this.maxArea)) &&
         (this.form.value.bedroom == null ? true: this.form.value.bedroom == x.bed_Room_Num) &&
         (this.form.value.internalStation == null ? x : this.form.value.internalStation == x.parking) &&
        (this.form.value.serventRoom == null ? x : this.form.value.serventRoom == x.servant_Room) &&
        (this.form.value.store == null ? x : this.form.value.store == x.store) &&
         (this.form.value.roof == null ? x : this.form.value.roof == x.roof) &&
         (this.form.value.salon == null ? x : this.form.value.salon == x.salon) &&
         (this.form.value.p_Intrance == null ? x : this.form.value.p_Intrance == x.p_Intrance) 
        && (this.form.value.status == 'all' ? x.statusId : this.form.value.status == x.statusId);

    });
    this.obj.emit(this.FilteredProperty);
  }
  clearFilter() {
    this.form.patchValue({
      projectId: 'all',
      status: '1',  //متاح
      price: 'all',
      totalArea: 'all',
      internalStation: null,
      bedroom: null,
      dressRoom: null,
      serventRoom: null,
      store: null,
      roof: null,
      salon: null,
      p_Intrance: null
    })
    this.ApplyFilterProperty();
  }
}
export interface ranges {
  id: number,
  from: number,
  to: number,
  name: string,
  rangeType: string
}