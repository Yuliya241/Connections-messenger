export interface Group {
  Count?: number;
  Items: Item[];
}

export interface Item {
  id: { S: string; };
  name: { S: string; };
  createdAt?: { S: string; };
  createdBy?: { S: string; };
  groupID: string;
}

export interface GroupPeople {
  Count?: number;
  Items: Person[];
}

export interface Person {
  uid: { S: string; };
  name: { S: string; };
}

export interface ActiveConversations {
  Count?: number;
  Items: Companion[];
}

export interface Companion {
  id?: { S: string; };
  companionID: { S: string; };
}

export interface ChatState {
  messageError: string;
  loading: boolean;
  loaded: boolean;
  grouplist: Group | null;
  isGrouplistLoaded: boolean;
  newName: string;
  peoplelist: GroupPeople | null;
  isPeoplelistLoaded: boolean;
  loadingButton: boolean;
  conversationID: string;
  conversationlist: ActiveConversations | null;
  isConversationsLoaded: boolean;
}

export const initialChatState: ChatState = {
  messageError: '',
  loaded: true,
  loading: false,
  grouplist: null,
  isGrouplistLoaded: false,
  newName: '',
  peoplelist: null,
  isPeoplelistLoaded: false,
  loadingButton: false,
  conversationID: '',
  conversationlist: null,
  isConversationsLoaded: false,
};
