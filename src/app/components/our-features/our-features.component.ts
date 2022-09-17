import { Component, OnInit } from '@angular/core';
import { changeLanguageService } from 'src/app/services/changeLanguage.service';
import AOS from "aos";

@Component({
  selector: 'app-our-features',
  templateUrl: './our-features.component.html',
  styleUrls: ['./our-features.component.scss']
})
export class OurFeaturesComponent implements OnInit {

  saqeefahBenefits = [];
  saqeefahBenefitsAr =
    [
      {
        title: ' سنوات طويلة من الخبرة ',
        icon: "experience.png"
      }, {
        title: '	الجودة قيمة عُليا في المشاريع والخدمات',
        icon: "quality.png",
      }, {
        title: '	تقديم خدمات مميزة لما بعد البيع',
        icon: "Services.png"
      }, {
        title: '	وحدات سكنية عصرية',
        icon: "units.png"
      },
      {
        title: '	واجهات تصميمية فارقة',
        icon: "design.png"
      },
      {
        title: '	وحدات سكنية بمساحات واسعة',
        icon: "area.png"
      },
      {
        title: '	نخبة من الكوادر البشرية',
        icon: "human.png",

      },
      {
        title: '	إنجاز سريع للمشاريع',
        icon: "fast.png"
      },
      {
        title: '	شبكة من العلاقات المهنية',
        icon: "relationships.png"
      }
    ]

    saqeefahBenefitsEN =
    [
      {
        title: ' Many years of experience',
        icon: "experience.png"
      }, {
        title: 'Quality is a supreme value in projects and services',
        icon: "quality.png",
      }, {
        title: 'Providing excellent after-sales services',
        icon: "Services.png"
      }, {
        title: 'Modern Residential Units',
        icon: "units.png"
      },
      {
        title: '	Distinguished Design Interfaces',
        icon: "design.png"
      },
      {
        title: 'Residential units with large areas',
        icon: "area.png"
      },
      {
        title: 'Elite human cadres',
        icon: "human.png",

      },
      {
        title: 'Fast completion of projects',
        icon: "fast.png"
      },
      {
        title: 'network of professional relationships',
        icon: "relationships.png"
      }
    ]
  constructor(private language: changeLanguageService) { }
  ngOnInit(): void {
  // AOS.init();
    this.saqeefahBenefits = this.language.getLanguageID() == "1" ? this.saqeefahBenefitsAr : this.saqeefahBenefitsEN;
    this.language.changeLanguageStatus.subscribe((data) => {
      this.saqeefahBenefits = this.language.getLanguageID() == "1" ? this.saqeefahBenefitsAr : this.saqeefahBenefitsEN;
    })
  }

}
