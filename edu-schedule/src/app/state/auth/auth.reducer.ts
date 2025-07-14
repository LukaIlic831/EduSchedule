import { createReducer, on } from '@ngrx/store';
import {
  authFailure,
  loadUserSuccess,
  signInSuccess,
  signOutSuccess,
  signUpSuccess,
  updateUserAndCreateProfessorSuccess,
  updateUserAndCreateStudentSuccess,
  updateUserFailure,
} from './auth.actions';
import { User } from './models/user.model';

export interface AuthState {
  token: string | null;
  role: string | null;
  error: { status: number; message: string } | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  role: null,
  error: null,
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(signInSuccess, (state, { token, role }) => ({ ...state, token, role })),
  on(authFailure, (state, { error }) => ({ ...state, error })),
  on(updateUserFailure, (state, { error }) => ({ ...state, error })),
  on(signUpSuccess, (state, { token, role }) => ({ ...state, token, role })),
  on(loadUserSuccess, (state, { user }) => ({ ...state, user })),
  on(signOutSuccess, () => initialState),
  on(
    updateUserAndCreateProfessorSuccess,
    (state, { professor, university }) => ({ ...state, professor, university })
  ),
  on(updateUserAndCreateStudentSuccess, (state, { student, university }) => ({
    ...state,
    student,
    university,
  }))
);
