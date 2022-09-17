import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-info-table',
  templateUrl: './info-table.component.html',
  styleUrls: ['./info-table.component.scss'],
})
export class InfoTableComponent implements OnInit {
 @Input() data = [
    {
      id: '1',
      no: '1',
      floors: 'Ground Floor',
      space: '206.21',
      price: '1239000',
      rooms: '30',
      feature:
        'مجلس مفتوح عالصالة + غرفتين نوم + 3 دورات مياه + سيب خاص + غرفة خادمة + موقف خارجي + غرفة مفرغة',
      status: 'للبيع',
    },
    {
      id: '2',
      no: '2',
      floors: 'Ground Floor',
      space: '206.21',
      price: '1239000',
      rooms: '30',
      feature:
        'مجلس مفتوح عالصالة + غرفتين نوم + 3 دورات مياه + سيب خاص + غرفة خادمة + موقف خارجي + غرفة مفرغة',
      status: 'للبيع',
    },
    {
      id: '3',
      no: '3',
      floors: 'Ground Floor',
      space: '206.21',
      price: '1239000',
      rooms: '30',
      feature:
        'مجلس مفتوح عالصالة + غرفتين نوم + 3 دورات مياه + سيب خاص + غرفة خادمة + موقف خارجي + غرفة مفرغة',
      status: 'للبيع',
    },
    {
      id: '4',
      no: '4',
      floors: 'Ground Floor',
      space: '206.21',
      price: '1239000',
      rooms: '30',
      feature:
        'مجلس مفتوح عالصالة + غرفتين نوم + 3 دورات مياه + سيب خاص + غرفة خادمة + موقف خارجي + غرفة مفرغة',
      status: 'للبيع',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
