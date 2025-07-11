import { createAction, props } from '@ngrx/store';

export const signIn = createAction(
  '[Auth] Sign In',
  props<{ email: string; password: string }>()
);

export const signInSuccess = createAction(
  '[Auth] Sign In Success',
  props<{ token: string, role: string }>()
);

export const signInFailure = createAction(
  '[Auth] Sign In Failure',
 props<{ error: { status: number; message: string } }>()
);

export const signUp = createAction(
  '[Auth] Sign up',
  props<{ username:string, email: string; password: string, role:string }>()
);

export const signUpSuccess = createAction(
  '[Auth] Sign up Success',
  props<{ token: string, role: string }>()
);

export const signUpFailure = createAction(
  '[Auth] Sign up Failure',
 props<{ error: { status: number; message: string } }>()
);
