import { createReducer, on } from '@ngrx/store';

import { ChatState, initialChatState, Item } from './chat-state.models';
import {
  createConversation,
  createConversationSuccess,
  createGroup,
  createGroupSuccess,
  deleteGroup,
  deleteGroupSuccess,
  errorMessage,
  getConversationList,
  getConversationListSuccess,
  getListOfGroup,
  getListOfGroupSuccess,
  getListOfPeople,
  getListOfPeopleSuccess,
} from './chat.actions';

export const chatReducer = createReducer<ChatState>(
  initialChatState,
  on(getListOfGroup, (state): ChatState => ({
    ...state,
    messageError: '',
    loading: true,
  })),
  on(getListOfGroupSuccess, (state, action): ChatState => ({
    ...state,
    messageError: '',
    grouplist: action.data,
    loaded: true,
    loading: false,
    isGrouplistLoaded: true,
  })),
  on(createGroup, (state, action): ChatState => ({
    ...state,
    messageError: '',
    loading: true,
    newName: action.name,
  })),
  on(createGroupSuccess, (state, action): ChatState => ({
    ...state,
    messageError: '',
    grouplist: {
      Items: [...[...state.grouplist?.Items || []], {
        id: { S: action.groupID },
        name: { S: state.newName },
        createdBy: { S: localStorage.getItem('uid') || '' },
        groupID: action.groupID,
      },
      ],
    },
    loaded: true,
    loading: false,
    isGrouplistLoaded: true,
  })),
  on(errorMessage, (state, action): ChatState => ({
    ...state,
    messageError: action.errorMessage,
    loaded: true,
    loading: false,
  })),
  on(deleteGroup, (state, action): ChatState => ({
    ...state,
    messageError: '',
    loading: true,
    grouplist: {
      Items: [...state.grouplist?.Items || []]
        .filter((group: Item) => group.id.S !== action.groupID),
    },
  })),
  on(deleteGroupSuccess, (state): ChatState => ({
    ...state,
    messageError: '',
    loaded: true,
    loading: false,
    isGrouplistLoaded: true,
  })),

  on(getListOfPeople, (state): ChatState => ({
    ...state,
    messageError: '',
    loading: true,
    loadingButton: true,
  })),
  on(getListOfPeopleSuccess, (state, action): ChatState => ({
    ...state,
    messageError: '',
    peoplelist: action.data,
    loaded: true,
    loading: false,
    isPeoplelistLoaded: true,
    loadingButton: false,
  })),
  on(getConversationList, (state): ChatState => ({
    ...state,
    messageError: '',
    loading: true,
    loadingButton: true,
  })),
  on(getConversationListSuccess, (state, action): ChatState => ({
    ...state,
    messageError: '',
    conversationlist: action.data,
    loaded: true,
    loading: false,
    isPeoplelistLoaded: true,
    isConversationsLoaded: true,
    loadingButton: false,
  })),
  on(createConversation, (state, action): ChatState => ({
    ...state,
    messageError: '',
    loading: true,
    conversationID: action.companion,
  })),
  on(createConversationSuccess, (state, action): ChatState => ({
    ...state,
    messageError: '',
    conversationlist: {
      Items: [...[...state.conversationlist?.Items || []], {
        companionID: { S: action.conversationID },
      },
      ],
    },
    conversationID: action.conversationID,
    loaded: true,
    loading: false,
    isGrouplistLoaded: true,
    isPeoplelistLoaded: true,
    isConversationsLoaded: true,
  })),
);
