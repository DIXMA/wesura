import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  apiKey = 'AIzaSyBdwrdLKZ_wkdN4dV7zCaXSuZN0apeejG0';

  constructor(public http: HttpClient) { }

  getVideos(maxResults: any): Observable<Object> {
    const url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults;
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }));
  }

  searchVideos(search: any, maxResults: any): Observable<Object> {
    const url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&q=' + search + '&part=snippet &type=video,id&maxResults=' + maxResults;
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }));
  }
}
