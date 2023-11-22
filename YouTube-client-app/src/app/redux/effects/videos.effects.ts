import { inject, Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { debounceTime, filter, map, switchMap } from 'rxjs';
import { SearchVideosService } from 'src/app/youtube/services/search-videos.service';

import { fetchVideos, fetchVideosNext, fetchVideosSuccess } from '../actions/videos.actions';
import { selectSearchParams } from '../selectors/videos.selector';

@Injectable()
export class VideosEffects {
  private readonly actions$ = inject(Actions);

  private readonly store = inject(Store);

  private readonly searchService = inject(SearchVideosService);

  searchVideo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchVideos),
      filter((action) => action.searchTerm.length > 2),
      debounceTime(300),
      switchMap((action) => this.searchService.searchVideo(action.searchTerm, '')),
      map((response) => fetchVideosSuccess({ videos: response })),
    );
  });

  searchVideoNext$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchVideosNext),
      concatLatestFrom(() => this.store.select(selectSearchParams)),
      switchMap(([, { searchTerm, pageToken }]) => this.searchService
        .searchVideo(searchTerm, pageToken)),
      map((response) => fetchVideosSuccess({ videos: response })),
    );
  });
}
