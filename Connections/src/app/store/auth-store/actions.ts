import { createAction, props } from '@ngrx/store';

import { User } from './state.models';

export const signUp = createAction('[Auth] Sign Up', props<{ name: string, email: string, password: string }>());

export const errorMessage = createAction('[Auth] Error Message', props<{ errorMessage: string, resulttype: string }>());

export const empty = createAction('[Auth] Empty');

export const signIn = createAction('[Auth] Sign In', props<{ email: string, password: string }>());

export const authActionsSuccess = createAction('[Auth] Auth Actions Success', props<{ data: User, errorMessage: string, resulttype: string }>());

export const logout = createAction('[Auth] Logout');
