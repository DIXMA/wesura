import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  apiKey = 'AIzaSyCatkoYLjQ5hwN68hF4zBUWdP-pFIIyqBA';

  constructor(public http: HttpClient) { }

  getVideos(maxResults): Observable<Object> {
    const url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults;
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }));
  }

  searchVideos(search, maxResults): Observable<Object> {
    const url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&q=' + search + '&part=snippet &type=video,id&maxResults=' + maxResults;
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }));
  }
}
