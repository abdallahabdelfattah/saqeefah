import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-villa-modal',
  templateUrl: './villa-modal.component.html',
  styleUrls: ['./villa-modal.component.scss']
})
export class VillaModalComponent implements OnInit {

  @Input() Gallery: any[]
  @Input() modalId: string
  @Input() villa: any
  constructor() { }

  appRootUrl = environment.appRoot;

  ngOnInit(): void {
  }

}
