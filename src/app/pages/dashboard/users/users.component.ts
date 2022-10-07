import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { IUser } from 'src/app/shared/services/IUser';
import { AdminUserService } from '../setting/services/admin-user.service';
import { User } from './user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit ,OnDestroy {
      allAdmin:IUser[]=[];
      formAdmin:User;
            dtOptions: DataTables.Settings = {};
   // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
     public form:FormGroup= new FormGroup({
        email:new FormControl('',[Validators.required]),
        phone:new FormControl('',[Validators.required]),
        password:new FormControl('',[Validators.required]),
        fullName:new FormControl('',[Validators.required])
      })


  constructor(private admin: AdminUserService, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };


    this.getAdminUser();
    this.initialization();

  }


  getAdminUser(){
    this.admin.getAllAdmin().subscribe(res=>{


      if(!res.isError){

        this.allAdmin= res.result.data;
        this.dtTrigger.next(this.allAdmin);
      }
      else{

       this.toastr.error(res.error)
      }
    })
  }

   setAdmin(event){
    // if (this.form.invalid) {
    //   return;
    // }
    console.log(this.form.value); 
    this.formAdmin={
      email:this.form.value.email,
      phone:this.form.value.phone,
      password:this.form.value.password,
      fullName:this.form.value.fullName
    }
    console.log("formAdmin",this.formAdmin)

    this.admin.setAdmin(this.formAdmin).subscribe(res => {
      
      if (!res.isError) {
       this.toastr.success("Successfully Added")
       this.getAdminUser();
       this.form.reset();

      } else {
        this.toastr.error('Failed Added');
      }
    })

   }


   deleteAdmin(adminId){
    this.admin.deleteAdmin(adminId).subscribe(res=>{
      if(!res.error)
      {

        this.toastr.success('successfully Deleted');
        this.getAdminUser();
      }
      else{
        this.toastr.error(' Failed Deleted');
      }


    })
   }


  initialization(){
    this.form.setValue({
      email:'',
      phone:'',
      password:'',
      fullName:''



    })
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
