import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { PlaceOrderService } from 'src/app/services/place-order.service';
import { placeorderItem } from '../model/placeorderItem.inerface';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit ,OnDestroy{

  Allplaceorder:placeorderItem[]=[];
  dtOptions: DataTables.Settings = {};
   // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor( private placeorderList : PlaceOrderService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.getFeedback();
  }

  getFeedback()
  {
    this.placeorderList.getplaceOrder().subscribe(res =>{

       console.log("Allplaceorder obj:", res)
       if(!res.result.isError)
       {
        this.Allplaceorder= res.result.data;
        this.dtTrigger.next(this.Allplaceorder);
       }
       else{

       this.toastr.error(":: Failed Loading")


       }



    })

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
