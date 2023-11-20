import { createAction, props } from '@ngrx/store';

import { VideoItem } from 'src/app/youtube/models/search-item.model';

import { CustomCard } from '../state.models';

export const fetchVideos = createAction('[Videos] Fetch Videos', props<{ searchTerm: string }>());

export const fetchVideosSuccess = createAction('[Videos] Fetch Videos Success', props<{ videos: VideoItem[] }>());

export const setCustomCard = createAction('[Videos] Set Custom Card', props<{ id: string }>());

export const createCustomCard = createAction('[Videos] Create Custom Card', props<{ newCard: CustomCard }>());

export const deleteCustomCard = createAction('[Videos] Delete Custom Card', props<{ id: string }>());

export const changeFavorite = createAction('[Videos] Change Favorite', props<{ id: string, favoriteList: VideoItem }>());
