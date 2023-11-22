import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { map, Subject, switchMap } from 'rxjs';
import { setPageToken } from 'src/app/redux/actions/videos.actions';
import { environment } from 'src/environments/environment';

import { SearchResponse, VideoResponse } from '../models/search-item.model';

@Injectable({
  providedIn: 'root',
})
export class SearchVideosService {
  constructor(public http: HttpClient, private store: Store) { }

  private searchTerm = new Subject<string>();

  public searchTerm$ = this.searchTerm.asObservable();

  public searchVideo(keyword: string, pageToken: string) {
    const urlParams = new HttpParams()
      .set('part', 'snippet')
      .set('type', 'video')
      .set('maxResults', 20)
      .set('q', keyword)
      .set('pageToken', pageToken);

    return this.http.get<SearchResponse>(environment.apiSearchUrl, { params: urlParams })
      .pipe(
        switchMap((response: SearchResponse) => {
          const id: string = response.items.map((item) => item.id.videoId).join(',');
          const { nextPageToken } = response;

          if (nextPageToken) {
            this.store.dispatch(setPageToken({ pageToken: nextPageToken }));
          }

          return this.searchVideoById(id);
        }),
        map((response: VideoResponse) => response.items),
      );
  }

  public searchVideoById(id: string) {
    const params = new HttpParams()
      .set('id', id)
      .set('part', 'snippet,statistics');
    return this.http.get<VideoResponse>(environment.apiVideoUrl, { params });
  }
}
