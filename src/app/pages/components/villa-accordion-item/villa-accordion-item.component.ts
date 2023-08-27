import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-villa-accordion-item',
  templateUrl: './villa-accordion-item.component.html',
  styleUrls: ['./villa-accordion-item.component.scss']
})
export class VillaAccordionItemComponent implements OnInit {

  @Input() villaDetails: any ={villa_id:1,project_Ref:20,villa_code:10002};
  @Input() index: number;
  @Input() firstChild:boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
