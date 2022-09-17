import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-vedio',
  templateUrl: './vedio.component.html',
  styleUrls: ['./vedio.component.scss']
})
export class VedioComponent implements OnInit {

 
  iframe_html: any;
  youtubeUrl = "https://www.youtube.com/watch?v=iHhcHTlGtRs";
  constructor(
    private embedService: EmbedVideoService
  ) {
    // this.yt_iframe_html = this.embedService.embed(this.youtubeUrl);
    // this.vimeo_iframe_html = this.embedService.embed(this.vimeoUrl);
    this. iframe_html = this.embedService.embed(this.youtubeUrl, {
      query: { autoplay: 1 }
    });
  }
  ngOnInit(): void {
    
  }
}
