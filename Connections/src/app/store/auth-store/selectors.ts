import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from './state.models';

export const selectFeature = createFeatureSelector<AuthState>('auth');

export const selectSignUpError = createSelector(selectFeature, (state: AuthState) => {
  return state.messageError;
});

export const selectLoading = createSelector(selectFeature, (state: AuthState) => state.loading);

export const selectLoaded = createSelector(selectFeature, (state: AuthState) => state.loaded);

export const selectEmails = createSelector(selectFeature, (state: AuthState) => state.emails);
