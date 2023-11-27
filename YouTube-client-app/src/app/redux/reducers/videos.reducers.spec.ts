import { changePageNumber, fetchVideos, fetchVideosSuccess, setPageToken } from '../actions/videos.actions';
import { mockState } from '../selectors/videos.selectors.spec';
import { VideosState } from '../state.models';
import { videosReducer } from './videos.reducers';

describe('VideosReducers', () => {
  let initialState: VideosState;

  beforeEach(() => {
    initialState = { ...initialState };
  });

  it('should fetchVideos', () => {
    const result = videosReducer(initialState, fetchVideos({ searchTerm: 'angular' }));

    expect(result).toEqual({
      searchTerm: 'angular',
    });
  });

  it('should changePageNumber', () => {
    const result = videosReducer(
      initialState,
      changePageNumber({
        pageNumber: 2,
      }),
    );
    expect(result).toEqual({
      pageNumber: 2,
    });
  });

  it('should fetchVideosSuccess', () => {
    const result = videosReducer(initialState, fetchVideosSuccess({ videos: mockState.items }));

    expect(result).toEqual({
      items: mockState.items,
    });
  });

  it('should setPageToken', () => {
    const result = videosReducer(initialState, setPageToken({ pageToken: 'token' }));

    expect(result).toEqual({
      pageToken: 'token',
    });
  });
});
