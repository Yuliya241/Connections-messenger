import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, find, map, Subject, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { SearchResponse, VideoItem, VideoResponse } from '../models/search-item.model';

@Injectable({
  providedIn: 'root',
})
export class SearchVideosService {
  private searchTerm = new Subject<string>();

  public searchTerm$ = this.searchTerm.asObservable();

  private videoSource = new BehaviorSubject<VideoItem[]>([]);

  public video$ = this.videoSource.asObservable();

  constructor(public http: HttpClient) { }

  public searchVideo(keyword: string) {
    const urlParams = new HttpParams()
      .set('part', 'snippet')
      .set('type', 'video')
      .set('maxResults', 10)
      .set('q', keyword);

    return this.http.get<SearchResponse>(environment.apiSearchUrl, { params: urlParams })
      .pipe(
        switchMap((response: SearchResponse) => {
          const id: string = response.items.map((item) => item.id.videoId).join(',');
          const params = new HttpParams()
            .set('id', id)
            .set('part', 'snippet,statistics');
          return this.http.get<VideoResponse>(environment.apiVideoUrl, { params });
        }),
        tap((response: VideoResponse) => this.videoSource.next(response.items)),
      );
  }

  public searchVideoById(id: string) {
    const params = new HttpParams()
      .set('id', id)
      .set('part', 'snippet,statistics');
    return this.http.get<VideoResponse>(environment.apiVideoUrl, { params })
      .pipe(
        map((response: VideoResponse) => response),
        switchMap((response: VideoResponse) => response.items),
        find((item) => item.id === id),
      );
  }

  public printInput(text: string) {
    this.searchTerm.next(text);
  }
}
