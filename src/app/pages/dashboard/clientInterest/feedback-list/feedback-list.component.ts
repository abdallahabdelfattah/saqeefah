import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FeedbackService } from 'src/app/services/feedback.service';
import { feedbackItem } from '../model/feedbackItem.interface';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit ,OnDestroy{

  Allfeedback:feedbackItem[]=[];
  dtOptions: DataTables.Settings = {};
   // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor( private feedbackList : FeedbackService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.getFeedback();
  }

  getFeedback()
  {
    this.feedbackList.getFeedback().subscribe(res =>{

       if(!res.result.isError)
       {
        this.Allfeedback= res.result.data;
        this.dtTrigger.next(this.Allfeedback);
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
