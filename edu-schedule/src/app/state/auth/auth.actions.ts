import { createAction, props } from '@ngrx/store';
import {
  AuthFailurePayload,
  LoadUserSuccessPayload,
  SignInPayload,
  SignInSuccessPayload,
  SignUpPayload,
  SignUpSuccessPayload,
  UpdateUserAndCreateProfessorPayload,
  UpdateUserAndCreateProfessorSuccessPayload,
  UpdateUserAndCreateStudentPayload,
  UpdateUserAndCreateStudentSuccessPayload,
} from './models/auth.actions.payload';

export const signIn = createAction('[Auth] Sign In', props<SignInPayload>());

export const signInSuccess = createAction(
  '[Auth] Sign In Success',
  props<SignInSuccessPayload>()
);

export const signUp = createAction('[Auth] Sign Up', props<SignUpPayload>());

export const signUpSuccess = createAction(
  '[Auth] Sign Up Success',
  props<SignUpSuccessPayload>()
);

export const authFailure = createAction(
  '[Auth] Auth Failure',
  props<AuthFailurePayload>()
);

export const loadUser = createAction('[Auth] Load User');

export const loadUserSuccess = createAction(
  '[Auth] Load User Success',
  props<LoadUserSuccessPayload>()
);

export const signOut = createAction('[Auth] Sign Out');
export const signOutSuccess = createAction('[Auth] Sign Out Success');

export const updateUserAndCreateProfessor = createAction(
  '[Auth] Update User And Create Professor',
  props<UpdateUserAndCreateProfessorPayload>()
);

export const updateUserAndCreateProfessorSuccess = createAction(
  '[Auth] Update User And Create Professor Success',
  props<UpdateUserAndCreateProfessorSuccessPayload>()
);

export const updateUserAndCreateStudent = createAction(
  '[Auth] Update User And Create Student',
  props<UpdateUserAndCreateStudentPayload>()
);

export const updateUserAndCreateStudentSuccess = createAction(
  '[Auth] Update User And Create Student Success',
  props<UpdateUserAndCreateStudentSuccessPayload>()
);