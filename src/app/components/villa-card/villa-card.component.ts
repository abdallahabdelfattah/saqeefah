import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-villa-card',
  templateUrl: './villa-card.component.html',
  styleUrls: ['./villa-card.component.scss']
})
export class VillaCardComponent implements OnInit {

  @Input() villa:any
  appRootUrl=environment.appRoot+'/';
  constructor() { }
  ngOnInit(): void {
  }

}
