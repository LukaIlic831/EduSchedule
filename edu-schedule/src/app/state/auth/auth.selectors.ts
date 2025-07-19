import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const authFeatureKey = 'auth';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error ?? null
);

export const selectAuthToken = createSelector(
  selectAuthState,
  (state) => state.token
);

export const selectAuthRole = createSelector(
  selectAuthState,
  (state) => state.role
);

export const selectAuthUserUsername = createSelector(
  selectAuthState,
  (state) => state.user?.username ?? null
);

export const selectAuthUserUserId = createSelector(
  selectAuthState,
  (state) => state.user?.id ?? null
);

export const selectAuthUserProfessor = createSelector(
  selectAuthState,
  (state) => state.user?.professor ?? null
);

export const selectAuthUserProfessorId = createSelector(
  selectAuthState,
  (state) => state.user?.professor?.id ?? null
);

export const selectAuthUserStudent = createSelector(
  selectAuthState,
  (state) => state.user?.student ?? null
);

export const selectAuthUserStudentStudyProgramId = createSelector(
  selectAuthUserStudent,
  (student) => student?.studyProgram.id ?? null
);

export const selectAuthUserStudentIndex = createSelector(
  selectAuthUserStudent,
  (student) => {
    return student?.index ?? null;
  }
);

export const selectAuthUserUniversityId = createSelector(
  selectAuthState,
  (state) => state.user?.university?.id ?? null
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state) => state.user ?? null
);
