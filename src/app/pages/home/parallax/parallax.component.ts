import { Component, OnInit } from '@angular/core';
import { siteInfo } from '../../Models/siteInfo';

@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.scss']
})
export class ParallaxComponent implements OnInit {

  siteInformation:siteInfo;
  ngOnInit(): void {
   
  }
  ngAfterContentChecked() {
   // this.siteInformation=this.shared.siteInformation;
  }
 
}
