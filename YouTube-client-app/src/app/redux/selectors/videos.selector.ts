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
