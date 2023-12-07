export interface User {
  token: string;
  uid: string;
  messageError: string;
}

export interface UserDetails {
  uid: {
    S: string;
  }
  name: {
    S: string;
  }
  createdAt: {
    S: string;
  }
  email: {
    S: string;
  }
}

export interface AuthState {
  messageError: string;
  user: User | null;
  loading: boolean;
  loaded: boolean;
  emails: string[];
  profile: UserDetails | null;
  isProfileLoaded: boolean;
  nameChanged: {
    S: string;
  }
}

export const initialState: AuthState = {
  messageError: '',
  user: null,
  loaded: true,
  loading: false,
  emails: [],
  profile: null,
  isProfileLoaded: false,
  nameChanged: {
    S: '',
  },
};
