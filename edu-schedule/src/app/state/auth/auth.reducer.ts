import { createReducer, on } from '@ngrx/store';
import {
  authFailure,
  loadUser,
  loadUserSuccess,
  signInSuccess,
  signOutSuccess,
  signUpSuccess,
  updateUserAndCreateProfessorSuccess,
  updateUserAndCreateStudentSuccess,
} from './auth.actions';
import { User } from './models/user.model';

export interface AuthState {
  token: string;
  role: string;
  error: { status: number; message: string } | null;
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  token: '',
  role: '',
  error: null,
  user: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(signInSuccess, signUpSuccess, (state, { token, role }) => ({
    ...state,
    token,
    role,
  })),
  on(authFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(loadUser, (state) => ({ ...state, loading: true })),
  on(loadUserSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loading: false,
  })),
  on(signOutSuccess, () => initialState),
  on(
    updateUserAndCreateProfessorSuccess,
    (state, { professor, university }) => ({
      ...state,
      user: {
        ...state.user!,
        professor,
        university,
      },
    })
  ),
  on(updateUserAndCreateStudentSuccess, (state, { student, university }) => ({
    ...state,
    user: {
      ...state.user!,
      student,
      university,
    },
  }))
);
