import { createFeatureSelector, createSelector } from '@ngrx/store';
import { classAdapter, ClassState } from './class.reducer';

export const classFeatureKey = 'class';
export const selectClassState =
  createFeatureSelector<ClassState>(classFeatureKey);

const { selectAll } = classAdapter.getSelectors();

export const selectAllClasses = createSelector(selectClassState, selectAll);

export const selectSelectedClass = createSelector(
  selectClassState,
  (state: ClassState) => state.selectedClass ?? null
);

export const selectSearchQuery = createSelector(
  selectClassState,
  (state) => state.searchQuery
);

export const selectSelectedYear = createSelector(
  selectClassState,
  (state) => state.selectedYear ?? null
);

export const selectSelectedClassroomId = createSelector(
  selectClassState,
  (state) => state.selectedClassroomId ?? null
);

export const selectSelectedSubjectId = createSelector(
  selectClassState,
  (state) => state.selectedSubjectId ?? null
);

export const selectFilteredClasses = createSelector(
  selectAllClasses,
  selectSearchQuery,
  selectSelectedYear,
  selectSelectedSubjectId,
  selectSelectedClassroomId,
  (classes, query, year, subject, classroom) => {
    return classes.filter((cls) => {
      const matchesQueryInTitle =
        !query || cls.lectureTitle.toLowerCase().includes(query.toLowerCase());
      const matchesQueryInDescription =
        !query || cls.lectureDesc.toLowerCase().includes(query.toLowerCase());
      const matchesYear = !year || cls.subject.year === year;
      const matchesSubject = !subject || cls.subject.id === subject;
      const matchesClassroom = !classroom || cls.classroom.id === classroom;
      return (
        (matchesQueryInTitle || matchesQueryInDescription) &&
        matchesYear &&
        matchesSubject &&
        matchesClassroom
      );
    });
  }
);

export const selectClassLoading = createSelector(
  selectClassState,
  (state) => state.loading
);
