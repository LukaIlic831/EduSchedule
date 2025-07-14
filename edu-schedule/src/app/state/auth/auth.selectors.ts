import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const authFeatureKey = 'auth';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error!
);

export const selectAuthToken = createSelector(
  selectAuthState,
  (state) => state.token!
);

export const selectAuthRole = createSelector(
  selectAuthState,
  (state) => state.role!
);

export const selectAuthUserUsername = createSelector(
  selectAuthState,
  (state) => state.user?.username!
);

export const selectAuthUserUserId = createSelector(
  selectAuthState,
  (state) => state.user?.id!
);

export const selectAuthUserUniversityId = createSelector(
  selectAuthState,
  (state) => state.user?.university?.id!
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state) => state.user!
);
