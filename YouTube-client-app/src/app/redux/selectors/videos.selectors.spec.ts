import { VideosState } from '../state.models';
import { selectFeature, selectVideos } from './videos.selector';

export const mockState: VideosState = {
  cards: [],
  items: [],
  searchTerm: '',
  favoriteList: [],
  pageNumber: 1,
  pageToken: '',
};

describe('VideosSelectors', () => {
  it('should select videos state', () => {
    expect(selectFeature.projector(mockState)).toEqual(mockState);
  });

  it('should select videos list from state', () => {
    expect(selectVideos.projector(mockState)).toEqual(mockState.items);
  });
});
