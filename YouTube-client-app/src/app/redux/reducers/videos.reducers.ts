import { createReducer, on } from '@ngrx/store';

import {
  changeFavorite,
  createCustomCard,
  deleteCustomCard,
  fetchVideos,
  fetchVideosSuccess,
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
  })),
  on(changeFavorite, (state, { id, favoriteList }): VideosState => {
    const item = [...state.favoriteList].map((elem) => elem.id).includes(id);
    return {
      ...state,
      favoriteList: item ? state.favoriteList
        .filter((card) => card.id !== id) : [...state.favoriteList, favoriteList],
    };
  }),
);
