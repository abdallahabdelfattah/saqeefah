import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-villa-accordion-item',
  templateUrl: './villa-accordion-item.component.html',
  styleUrls: ['./villa-accordion-item.component.scss']
})
export class VillaAccordionItemComponent implements OnInit {

  @Input() villaDetails: any;
  @Input() index: number;
  @Input() firstChild:boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
