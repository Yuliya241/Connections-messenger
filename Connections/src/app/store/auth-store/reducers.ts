import { createReducer, on } from '@ngrx/store';

import {
  authActionsSuccess,
  errorMessage,
  getProfile,
  logout,
  setUser,
  signIn,
  signUp,
  updateUser,
  updateUserSuccess,
} from './actions';
import { AuthState, initialState, UserDetails } from './state.models';

export const authReducer = createReducer<AuthState>(
  initialState,
  on(signUp, (state, action): AuthState => ({
    ...state,
    messageError: '',
    loading: true,
    emails: [...state.emails, action.email],
  })),
  on(authActionsSuccess, (state, action): AuthState => ({
    ...state,
    messageError: '',
    user: action.data,
    loaded: true,
    loading: false,
  })),
  on(errorMessage, (state, action): AuthState => ({
    ...state,
    messageError: action.errorMessage,
    loaded: true,
    loading: false,
  })),
  on(signIn, (state, action): AuthState => ({
    ...state,
    messageError: '',
    loading: true,
    emails: [...state.emails, action.email],
  })),
  on(logout, (state): AuthState => ({
    ...state,
    loading: false,
    loaded: true,
  })),
  on(getProfile, (state): AuthState => ({
    ...state,
    loading: true,
  })),
  on(setUser, (state, action): AuthState => ({
    ...state,
    loaded: true,
    loading: false,
    profile: action.data,
    isProfileLoaded: true,
  })),
  on(updateUser, (state, action): AuthState => ({
    ...state,
    loading: true,
    nameChanged: {
      S: action.name,
    },
    isProfileLoaded: true,
  })),
  on(updateUserSuccess, (state): AuthState => {
    let data: UserDetails | null = {
      uid: { S: '' },
      name: { S: '' },
      createdAt: { S: '' },
      email: { S: '' },
    };
    if (state.profile !== null) {
      data.uid.S = state.profile.uid.S;
      data.name = state.nameChanged;
      data.createdAt.S = state.profile.createdAt.S;
      data.email.S = state.profile.email.S;
    } else {
      data = null;
    }
    return {
      ...state,
      profile: data,
      loaded: true,
      loading: false,
      isProfileLoaded: true,
    };
  }),
);
