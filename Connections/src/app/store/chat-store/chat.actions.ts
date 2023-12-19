import { createAction, props } from '@ngrx/store';

import { ActiveConversations, Group, GroupPeople, MessagesResponse } from './chat-state.models';

export const getListOfGroup = createAction('[Chat] Get List Of Group');

export const getListOfGroupSuccess = createAction('[Chat] Get List Of Group Success', props<{ data: Group }>());

export const errorMessage = createAction('[Chat] Error Message', props<{ errorMessage: string, resulttype: string }>());

export const empty = createAction('[Chat] Empty');

export const createGroup = createAction('[Chat] Create Group', props<{ name: string }>());

export const createGroupSuccess = createAction(
  '[Chat] Create Group Success',
  props<{ groupID: string, errorMessage: string, resulttype: string }>(),
);

export const deleteGroup = createAction('[Chat] Delete Group', props<{ groupID: string }>());

export const deleteGroupSuccess = createAction(
  '[Chat] Delete Group Success',
  props<{ errorMessage: string, resulttype: string }>(),
);

export const getListOfPeople = createAction('[Chat] Get List Of People');

export const getListOfPeopleSuccess = createAction('[Chat] Get List Of People Success', props<{ data: GroupPeople }>());

export const createConversation = createAction('[Chat] Create Conversation', props<{ companion: string }>());

export const createConversationSuccess = createAction(
  '[Chat] Create Conversation Success',
  props<{ conversationID: string, errorMessage: string, resulttype: string }>(),
);

export const getConversationList = createAction('[Chat] Get Conversation List');

export const getConversationListSuccess = createAction(
  '[Chat] Get Conversation List Success',
  props<{ data: ActiveConversations }>(),
);

export const setSelectedGroup = createAction(
  '[Chat] Set Selected Group',
  props<{ groupID: string }>(),
);

export const getLastMessages = createAction('[Chat] Get Last Messages', props<{ groupID: string, since: string }>());

export const getLastMessagesSuccess = createAction(
  '[Chat] Get Last Messages Success',

);

export const getListOfMessages = createAction('[Chat] Get List Of Messages', props<{ groupID: string }>());

export const getListOfMessagesSuccess = createAction(
  '[Chat] Get List Of Messages Success',
  props<{ data: MessagesResponse }>(),
);

export const sendMessages = createAction('[Chat] Send Messages', props<{ groupID: string, message: string }>());

export const sendMessagesSuccess = createAction(
  '[Chat] Send Messages Success',
  props<{ errorMessage: string, resulttype: string }>(),
);

export const setSelectedUser = createAction(
  '[Chat] Set Selected User',
  props<{ conversationID: string }>(),
);

export const updateDialogMessages = createAction('[Chat] Update Dialog Messages', props<{ conversationID: string, since: string }>());

export const updateDialogMessagesSuccess = createAction(
  '[Chat] Update Dialog Messages Success',
);

export const getDialogMessages = createAction('[Chat] Get Dialog Messages', props<{ conversationID: string }>());

export const getDialogfMessagesSuccess = createAction(
  '[Chat] Get Dialog Messages Success',
  props<{ data: MessagesResponse }>(),
);

export const sendDialogMessages = createAction('[Chat] Send Dialog Messages', props<{ conversationID: string, message: string }>());

export const sendDialogMessagesSuccess = createAction(
  '[Chat] Send Dialog Messages Success',
  props<{ errorMessage: string, resulttype: string }>(),
);

export const deleteDialog = createAction('[Chat] Delete Dialog', props<{ conversationID: string }>());

export const deleteDialogSuccess = createAction(
  '[Chat] Delete Dialog Success',
  props<{ errorMessage: string, resulttype: string }>(),
);
