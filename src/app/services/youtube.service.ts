import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  apiKey: string = 'AIzaSyBacKtN7eOSRTQGrM9wu9ltXLc0yrD5ZO8'; 
  constructor(public http: HttpClient) {}

  getVideosForChannel(channel, maxResults): Observable<Object> {
    let url =
      'https://www.googleapis.com/youtube/v3/search?key=' +
      this.apiKey +
      '&channelId=' +
      channel +
      '&fields=items(id(videoId),snippet(title,channelTitle,publishedAt,description,thumbnails/medium/url))&part=snippet' +
      '&order=viewCount&type=video,id&maxResults=' +
      maxResults; 
    return this.http.get(url).pipe(
      map((res) => {
        return res;
      })
    );
  }
  searchVideosForChannel(channel, maxResults, query): Observable<Object> {
    let url =
      'https://www.googleapis.com/youtube/v3/search?key=' +
      this.apiKey +
      '&channelId=' +
      channel +
      '&q=' + 
      query +
      '&fields=items(id(videoId),snippet(title,channelTitle,publishedAt,description,thumbnails/medium/url))&part=snippet' +
      '&order=viewCount&type=video,id&maxResults=' +
      maxResults; 
    return this.http.get(url).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
