import { createAction, props } from '@ngrx/store';
import { User } from './models/user.model';

export const signIn = createAction(
  '[Auth] Sign In',
  props<{ email: string; password: string }>()
);

export const signInSuccess = createAction(
  '[Auth] Sign In Success',
  props<{ token: string; role: string }>()
);

export const signUp = createAction(
  '[Auth] Sign Up',
  props<{ username: string; email: string; password: string; role: string }>()
);

export const signUpSuccess = createAction(
  '[Auth] Sign Up Success',
  props<{ token: string; role: string }>()
);

export const authFailure = createAction(
  '[Auth] Auth Failure',
  props<{ error: { status: number; message: string } }>()
);

export const loadUser = createAction('[Auth] Load User');

export const loadUserSuccess = createAction(
  '[Auth] Load User Success',
  props<{ user: User }>()
);
