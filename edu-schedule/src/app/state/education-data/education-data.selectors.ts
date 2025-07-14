import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EducationDataState } from './education-data.reducer';

export const educationDataFeatureKey = 'education-data';

export const selectEducationDataState =
  createFeatureSelector<EducationDataState>(educationDataFeatureKey);

export const selectEducationDataUniversities = createSelector(
  selectEducationDataState,
  (state) => state.universities!
);

export const selectEducationDataStudyPrograms = createSelector(
  selectEducationDataState,
  (state) => state.studyPrograms!
);

export const selectEducationDataSubjects = createSelector(
  selectEducationDataState,
  (state) => state.subjects!
);

export const selectEducationDataClassrooms = createSelector(
  selectEducationDataState,
  (state) => state.classrooms!
);
