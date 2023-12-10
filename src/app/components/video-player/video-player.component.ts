import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { siteInfo } from 'src/app/pages/Models/siteInfo';
import { SiteInformationSharedService } from 'src/app/services/site-information-shared.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {
  constructor(private shared:SiteInformationSharedService) {}
  @Input() src: string = 'https://vjs.zencdn.net/v/oceans.mp4';
  @Input() type: string = 'video/mp4';
  @Input() loop: string;
  siteInformation:siteInfo
  ngOnInit(): void {

    this.shared.siteInformationBS.subscribe(r => {
      this.siteInformation = r;
    });

  }

  pause() {
    var myVideo: any = document.getElementById('singleVideo');
    myVideo.pause();
  }
  

}
