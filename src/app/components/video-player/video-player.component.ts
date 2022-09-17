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
export class VideoPlayerComponent implements OnInit, AfterViewInit {
  constructor(private shared:SiteInformationSharedService) {}
  @Input() src: string = 'https://vjs.zencdn.net/v/oceans.mp4';
  @Input() type: string = 'video/mp4';
  @Input() loop: string;
  siteInformation:siteInfo
  ngOnInit(): void {}

  ngAfterViewInit() {
    console.log('myVideo.paused');
    setTimeout(() => {
      this.playPause();
    }, 100);
  }
  ngAfterContentChecked() {
    this.siteInformation=this.shared.siteInformation;
    
  }

  name = 'Angular';
  @ViewChild('videoPlayer', { static: true }) videoplayer: ElementRef;
  isPlay: boolean = false;

  playPause() {
    var myVideo: any = document.getElementById('my_video_1');
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
  }
  pause() {
    var myVideo: any = document.getElementById('my_video_1');
    myVideo.pause();
  }
  playLoop() {
    var myVideo: any = document.getElementById('my_video_1');
    if (this.loop == 'true') myVideo.loop = true;
  }

  makeBig() {
    var myVideo: any = document.getElementById('my_video_1');
    myVideo.width = 560;
  }

  makeSmall() {
    var myVideo: any = document.getElementById('my_video_1');
    myVideo.width = 320;
  }

  makeNormal() {
    var myVideo: any = document.getElementById('my_video_1');
    myVideo.width = 420;
  }

  skip(value) {
    let video: any = document.getElementById('my_video_1');
    video.currentTime += value;
  }

  restart() {
    let video: any = document.getElementById('my_video_1');
    video.currentTime = 0;
  }
}
