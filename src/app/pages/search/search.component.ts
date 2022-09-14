import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
listResult = [
  {
    img:'assets/images/list/l2.jpg'
  },
  {
    img:'assets/images/list/l4.jpg'
  },
  {
    img:'assets/images/list/l4.jpg'
  },
  {
    img:'assets/images/list/l2.jpg'
  },
  {
    img:'assets/images/list/l2.jpg'
  },
  {
    img:'assets/images/list/l4.jpg'
  },
]
  constructor() { }

  ngOnInit(): void {
  }

}
