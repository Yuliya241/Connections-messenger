import { createReducer, on } from '@ngrx/store';

import { authActionsSuccess, errorMessage, logout, signIn, signUp } from './actions';
import { AuthState, initialState } from './state.models';

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
    loading: true,
  })),
);
