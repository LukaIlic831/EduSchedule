import { createReducer, on } from '@ngrx/store';
import { signInFailure, signInSuccess } from './auth.actions';

export interface AuthState {
  token: string | null;
  error: string | null;
}


const initialState: AuthState = {
  token: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(signInSuccess, (state, { token }) => ({ ...state, token })),
  on(signInFailure, (state, { error }) => ({ ...state, error }))
);
