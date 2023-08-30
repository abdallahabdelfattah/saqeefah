import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkmark-formatter',
  templateUrl: './checkmark-formatter.component.html',
  styleUrls: ['./checkmark-formatter.component.scss']
})
export class CheckmarkFormatterComponent implements OnInit {

  @Input() Value ;
  constructor() { }

  ngOnInit(): void {
  }

}
