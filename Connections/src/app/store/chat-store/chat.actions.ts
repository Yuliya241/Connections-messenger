import { createAction, props } from '@ngrx/store';

import { Group } from './chat-state.models';

export const getListOfGroup = createAction('[Chat] Get List Of Group');

export const getListOfGroupSuccess = createAction('[Chat] Get List Of Group Success', props<{ data: Group }>());

export const errorMessage = createAction('[Chat] Error Message', props<{ errorMessage: string, resulttype: string }>());

export const empty = createAction('[Chat] Empty');

export const createGroup = createAction('[Chat] Create Group', props<{ name: string }>());

export const createGroupSuccess = createAction('[Chat] Create Group Success', props<{ groupID: string, errorMessage: string, resulttype: string }>());

export const deleteGroup = createAction('[Chat] Delete Group', props<{ groupID: string }>());

export const deleteGroupSuccess = createAction('[Chat] Delete Group Success', props<{ errorMessage: string, resulttype: string }>());
