import { createFeatureSelector, createSelector } from '@ngrx/store';
import { classAdapter, ClassState } from './class.reducer';

export const classFeatureKey = 'class';
export const selectClassState =
  createFeatureSelector<ClassState>(classFeatureKey);

const { selectAll, selectEntities } = classAdapter.getSelectors();

export const selectAllClasses = createSelector(selectClassState, selectAll);
export const selectClassEntities = createSelector(
  selectClassState,
  selectEntities
);

export const selectSelectedClass = createSelector(
  selectClassState,
  (state: ClassState) => state.selectedClass
);
