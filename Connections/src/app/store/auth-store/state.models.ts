export interface User {
  token: string;
  uid: string;
  messageError: string;
}

export interface AuthState {
  messageError: string;
  user: User | null;
  loading: boolean;
  loaded: boolean;
  emails: string[];
}

export const initialState: AuthState = {
  messageError: '',
  user: null,
  loaded: true,
  loading: false,
  emails: [],
};
