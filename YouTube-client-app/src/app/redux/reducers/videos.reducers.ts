import { createReducer, on } from '@ngrx/store';

import {
  addToFavorite,
  createCustomCard,
  deleteCustomCard,
  deleteFavoriteSuccess,
  fetchVideos,
  fetchVideosSuccess,
  makeFavoriteSuccess,
  setCustomCard,
} from '../actions/videos.actions';
import { initialState, VideosState } from '../state.models';

export const videosReducer = createReducer<VideosState>(
  initialState,
  on(fetchVideos, (state, { searchTerm }): VideosState => ({
    ...state,
    searchTerm,
  })),
  on(fetchVideosSuccess, (state, { videos }): VideosState => ({
    ...state,
    items: videos,
  })),
  on(setCustomCard, (state, { id }): VideosState => ({
    ...state,
    selectedCard: state.cards.find((card) => card.id === id),
  })),
  on(createCustomCard, (state, action): VideosState => ({
    ...state,
    cards: [...state.cards, action.newCard],
  })),
  on(deleteCustomCard, (state, { id }): VideosState => ({
    ...state,
    cards: state.cards.filter((card) => card.id !== id),
    // cards: state.cards.filter((card) => card.id !== id),
  })),
  on(addToFavorite, (state): VideosState => ({
    ...state,
  })),
  on(makeFavoriteSuccess, (state, action): VideosState => ({
    ...state,
    favorite: [...state.favorite, action.favorite],
  })),
  on(deleteFavoriteSuccess, (state, action): VideosState => ({
    ...state,
    favorite: [...state.favorite, action.favorite],
  })),
);
