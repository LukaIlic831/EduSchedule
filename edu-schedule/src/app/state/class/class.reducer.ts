import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ClassModel } from './models/class.model';
import {
  cancelReservedSeatSuccess,
  classFailure,
  createClassSuccess,
  deleteProfessorClassSuccess,
  loadClassByClassId,
  loadClassByClassIdSuccess,
  LoadClassesWithStudentReservedSeat,
  LoadClassesWithStudentReservedSeatSuccess,
  loadProfessorClasses,
  loadProfessorClassesSuccess,
  loadUniveristyClasses,
  loadUniveristyClassesSuccess,
  reserveSeatInClassSuccess,
  selectProfessorClassForDelete,
  selectProfessorClassForEdit,
  setSearchQuery,
  setSelectedClassroom,
  setSelectedSubject,
  setSelectedYear,
  updateClassSuccess,
} from './class.actions';

export interface ClassState extends EntityState<ClassModel> {
  error: { status: number; message: string } | null;
  selectedClass: ClassModel | null;
  searchQuery: string;
  selectedYear: number | null;
  selectedSubjectId: number | null;
  selectedClassroomId: number | null;
  loading: boolean;
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
  loading: false,
  selectedClassroomId: null,
});

export const classReducer = createReducer(
  initialState,
  on(createClassSuccess, (state, { createdClass }) =>
    classAdapter.addOne(createdClass, { ...state })
  ),
  on(
    loadProfessorClasses,
    loadClassByClassId,
    loadUniveristyClasses,
    LoadClassesWithStudentReservedSeat,
    (state) => ({ ...state, loading: true })
  ),
  on(classFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(
    loadProfessorClassesSuccess,
    loadUniveristyClassesSuccess,
    LoadClassesWithStudentReservedSeatSuccess,
    (state, { classes }) =>
      classAdapter.setAll(classes, { ...state, loading: false })
  ),
  on(deleteProfessorClassSuccess, (state) =>
    classAdapter.removeOne(state.selectedClass?.id!, {
      ...state,
      selectedClass: null,
    })
  ),
  on(updateClassSuccess, (state, { updatedClass }) =>
    classAdapter.updateOne(
      {
        id: updatedClass.id,
        changes: updatedClass,
      },
      { ...state, selectedClass: null }
    )
  ),
  on(
    selectProfessorClassForDelete,
    selectProfessorClassForEdit,
    (state, { classId }) => ({
      ...state,
      selectedClass: state.entities[classId] ?? null,
    })
  ),
  on(loadClassByClassIdSuccess, (state, { loadedClass }) => ({
    ...state,
    selectedClass: loadedClass,
    loading: false,
  })),
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
  on(setSelectedClassroom, (state, { selectedClassroomId }) => ({
    ...state,
    selectedClassroomId,
  })),
  on(reserveSeatInClassSuccess, (state, { reservedSeat }) => ({
    ...state,
    selectedClass: {
      ...state.selectedClass!,
      reservedSeats: [...state.selectedClass?.reservedSeats!, reservedSeat],
      availableSeats: state.selectedClass?.availableSeats! - 1,
    },
  })),
  on(cancelReservedSeatSuccess, (state, { canceledSeatId }) => ({
    ...state,
    selectedClass: {
      ...state.selectedClass!,
      reservedSeats: state.selectedClass!.reservedSeats.filter(
        (seat) => seat.id !== canceledSeatId
      ),
      availableSeats: state.selectedClass!.availableSeats + 1,
    },
  }))
);
