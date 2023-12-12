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

export interface ChatState {
  messageError: string;
  loading: boolean;
  loaded: boolean;
  grouplist: Group | null;
  isGrouplistLoaded: boolean;
  newName: string;
}

export const initialChatState: ChatState = {
  messageError: '',
  loaded: true,
  loading: false,
  grouplist: null,
  isGrouplistLoaded: false,
  newName: '',
};
