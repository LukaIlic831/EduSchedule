import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ClassModel } from './models/class.model';
import {
  classFailure,
  createClassSuccess,
  deleteProfessorClassSuccess,
  loadClassByClassIdSuccess,
  loadProfessorClassesSuccess,
  loadUniveristyClassesSuccess,
  reserveSeatInClassSuccess,
  selectProfessorClassForDelete,
  setSearchQuery,
  setSelectedSubject,
  setSelectedYear,
} from './class.actions';

export interface ClassState extends EntityState<ClassModel> {
  error: { status: number; message: string } | null;
  selectedClass: ClassModel | null;
  searchQuery: string;
  selectedYear: number | null;
  selectedSubjectId: number | null;
}

export const classAdapter = createEntityAdapter<ClassModel>({
  sortComparer: (a, b) =>
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
});

export const initialState: ClassState = classAdapter.getInitialState({
  error: null,
  selectedClass: null,
  searchQuery: '',
  selectedYear: null,
  selectedSubjectId: null,
});

export const classReducer = createReducer(
  initialState,
  on(createClassSuccess, (state, { createdClass }) =>
    classAdapter.addOne(createdClass, { ...state })
  ),
  on(classFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(loadProfessorClassesSuccess, (state, { classes }) =>
    classAdapter.setAll(classes, { ...state })
  ),
  on(deleteProfessorClassSuccess, (state) =>
    classAdapter.removeOne(state.selectedClass?.id!, {
      ...state,
      selectedClass: null,
    })
  ),
  on(selectProfessorClassForDelete, (state, { selectedClass }) => ({
    ...state,
    selectedClass,
  })),
  on(loadClassByClassIdSuccess, (state, { loadedClass }) => ({
    ...state,
    selectedClass: loadedClass,
  })),
  on(loadUniveristyClassesSuccess, (state, { classes }) =>
    classAdapter.setAll(classes, { ...state })
  ),
  on(setSearchQuery, (state, { searchQuery }) => ({
    ...state,
    searchQuery,
  })),

  on(setSelectedYear, (state, { selectedYear }) => ({
    ...state,
    selectedYear,
  })),
  on(setSelectedSubject, (state, { selectedSubjectId }) => ({
    ...state,
    selectedSubjectId,
  })),
  on(reserveSeatInClassSuccess, (state, { reservedSeat }) => ({
    ...state,
    selectedClass: {
      ...state.selectedClass!,
      reservedSeats: [...state.selectedClass?.reservedSeats!, reservedSeat],
      availableSeats: state.selectedClass?.availableSeats! - 1,
    },
  }))
);
