import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ContactUsService } from 'src/app/services/contact-us.service';
import { contactItem } from '../model/contactItem.interface';

@Component({
  selector: 'app-contact-us-list',
  templateUrl: './contact-us-list.component.html',
  styleUrls: ['./contact-us-list.component.scss']
})
export class ContactUsListComponent implements OnInit,OnDestroy {
  Allcontact:contactItem[]=[];
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
 // thus we ensure the data is fetched before rendering
 dtTrigger: Subject<any> = new Subject<any>();

  constructor( private contactList : ContactUsService, private toastr :ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.getContact();
  }

  getContact()
  {
    this.contactList.getContact().subscribe(res =>{

      if(!res.result.isError)
      {
         this.Allcontact= res.result.data;
         this.dtTrigger.next( this.Allcontact);

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
