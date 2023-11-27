import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { of, ReplaySubject, take } from 'rxjs';

import { SearchVideosService } from '../../youtube/services/search-videos.service';
import { fetchVideos, fetchVideosSuccess } from '../actions/videos.actions';
import { mockState } from '../selectors/videos.selectors.spec';
import { VideosEffects } from './videos.effects';

describe('VideosEffects', () => {
  let effect: VideosEffects;
  let action$: ReplaySubject<Action>;
  let service: SearchVideosService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        VideosEffects,
        provideMockActions(() => action$),
        provideMockStore({
          initialState: {
            videos: [],
          },
        }),
        {
          provide: SearchVideosService,
          useValue: {
            searchVideo: jest.fn(() => of(mockState.items)),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    effect = TestBed.inject(VideosEffects);
    service = TestBed.inject(SearchVideosService);
    action$ = new ReplaySubject(1);
  }));

  it('should be created', () => {
    expect(effect).toBeTruthy();
  });

  it('should fetch videos', async () => {
    action$.next(fetchVideos({ searchTerm: 'angular' }));

    const re = await new Promise((resolve) => {
      effect.searchVideo$.pipe(take(1)).subscribe(resolve);
    });

    expect(service.searchVideo).toHaveBeenCalledWith('angular', '');
    expect(re).toEqual(
      fetchVideosSuccess({
        videos: mockState.items,
      }),
    );
  });
});
