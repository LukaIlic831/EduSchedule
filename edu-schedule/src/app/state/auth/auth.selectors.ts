import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const authFeatureKey = 'auth';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);
