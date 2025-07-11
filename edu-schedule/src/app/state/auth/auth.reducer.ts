import { createReducer, on } from '@ngrx/store';
import {
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpSuccess,
} from './auth.actions';

export interface AuthState {
  token: string | null;
  role: string | null;
  error: { status: number; message: string } | null;
}

const initialState: AuthState = {
  token: null,
  role: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(signInSuccess, (state, { token, role }) => ({ ...state, token, role })),
  on(signInFailure, (state, { error }) => ({ ...state, error })),
  on(signUpSuccess, (state, { token, role }) => ({ ...state, token, role })),
  on(signUpFailure, (state, { error }) => ({ ...state, error }))
);
