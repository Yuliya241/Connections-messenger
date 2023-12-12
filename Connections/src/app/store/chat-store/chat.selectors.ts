import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ChatState } from './chat-state.models';

export const selectFeature = createFeatureSelector<ChatState>('chat');

export const selectError = createSelector(selectFeature, (state: ChatState) => {
  return state.messageError;
});

export const selectListOfGroup = createSelector(selectFeature, (state: ChatState) => {
  return state.grouplist?.Items;
});

export const selectLoading = createSelector(selectFeature, (state: ChatState) => state.loading);

export const selectLoaded = createSelector(selectFeature, (state: ChatState) => state.loaded);

export const selectGrouplistLoaded = createSelector(selectFeature, (state: ChatState) => {
  return state.isGrouplistLoaded;
});
