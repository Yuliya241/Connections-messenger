import { createFeatureSelector, createSelector } from '@ngrx/store';

import { VideosState } from '../state.models';

export const selectFeature = createFeatureSelector<VideosState>('videos');

export const selectVideos = createSelector(selectFeature, (state: VideosState) => state.items);

export const selectSearch = createSelector(selectFeature, (state: VideosState) => state.searchTerm);

export const selectCards = createSelector(selectFeature, (state: VideosState) => state.cards);

export const selectCard = createSelector(selectFeature, (state: VideosState) => state.selectedCard);

export const selectFavoriteList = createSelector(selectFeature, (state: VideosState) => {
  return state.favoriteList;
});

export const selectPageNumber = createSelector(selectFeature, (state: VideosState) => {
  return state.pageNumber;
});

export const selectPageToken = createSelector(selectFeature, (state: VideosState) => {
  return state.pageToken;
});

export const selectSearchParams = createSelector(selectFeature, (state: VideosState) => {
  return { searchTerm: state.searchTerm, pageToken: state.pageToken };
});
