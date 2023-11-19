import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { debounceTime, filter, map, switchMap } from 'rxjs';
import { SearchVideosService } from 'src/app/youtube/services/search-videos.service';

import { fetchVideos, fetchVideosSuccess } from '../actions/videos.actions';

@Injectable()
export class VideosEffects {
  private readonly actions$ = inject(Actions);

  private readonly searchService = inject(SearchVideosService);

  searchVideo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchVideos),
      filter((action) => action.searchTerm.length > 2),
      debounceTime(300),
      switchMap((action) => this.searchService.searchVideo(action.searchTerm)),
      map((response) => fetchVideosSuccess({ videos: response })),
    );
  });
}
