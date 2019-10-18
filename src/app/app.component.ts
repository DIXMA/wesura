import {Component, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {YoutubeService} from './youtube.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wesura';
  videos: any[];
  selectVideo: {
    videoId: '',
    description: '',
    title: '',
    thumbnails: '',
    urlEmbed: any
  };
  txtSearch: string = '';

  constructor(private spinner: NgxSpinnerService, private youTubeService: YoutubeService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.spinner.show();
    this.videos = [];
    this.youTubeService.getVideos(6).subscribe(lista => {
      lista['items'].map(item => {
        this.videos.push(this.formatDataVideo(item));
      });
      this.selectVideo = this.formatDataVideo(lista['items'][0])
      console.log(this.selectVideo)
      this.spinner.hide();
    },
    error => {
      alert('Se ha persentado un error al conectarse con youtube. Error: ' + error.message);
      this.spinner.hide();
    });
  }

  searchVideos() {
    console.log(this.txtSearch)
    console.log(this.txtSearch)
    this.spinner.show();
    this.videos = [];
    this.youTubeService.searchVideos(this.txtSearch, 6).subscribe(lista => {
      lista['items'].map(item => {        
        this.videos.push(this.formatDataVideo(item));
      });
      this.selectVideo = this.formatDataVideo(lista['items'][0])
      this.spinner.hide();
    }, error => {
      alert('Se ha persentado un error al conectarse con youtube. Error: ' + error.message);
      this.spinner.hide();
    });
  }

  selectedVideo(video) {
    this.selectVideo = video;
  }

  formatDataVideo(video) {
    return {
      videoId: video.id.videoId,
      description: video.snippet.description,
      title: video.snippet.title,
      thumbnails: video.snippet.thumbnails.medium,
      urlEmbed: this.updateVideoUrl(video.id.videoId)
    };
  }

  updateVideoUrl(id: string) {
    const url = 'https://www.youtube.com/embed/' + id;
    const lk = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    const html = `<iframe width="620" height="300" src="${lk}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`    
    return lk;
  }
}
