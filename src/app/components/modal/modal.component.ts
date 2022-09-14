import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
@Input() Gallery:any[]
@Input() modalId:string
@Input() projectDetails:any
  constructor() { }

   appRootUrl=environment.appRoot; 
   
  ngOnInit(): void {
  }

}
