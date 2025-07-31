import { createAction, props } from '@ngrx/store';
import {
  CancelReservedSeatPayload,
  CancelReservedSeatSuccessPayload,
  ClassFailurePayload,
  CreateClassPayload,
  CreateClassSuccessPayload,
  DeleteProfessorClassPayload,
  LoadClassByClassIdPayload,
  LoadClassByClassIdSuccessPayload,
  LoadClassesWithStudentReservedSeatPayload,
  LoadClassesWithStudentReservedSeatSuccessPayload,
  LoadProfessorClassesPayload,
  LoadProfessorClassesSuccessPayload,
  LoadUniversityClassesPayload,
  LoadUniversityClassesSuccessPayload,
  ReserveSeatInClassPayload,
  ReserveSeatInClassSuccessPayload,
  SelectProfessorClassForDeletePayload,
  SelectProfessorClassForEditPayload,
  SetSearchQueryPayload,
  SetSelectedSubjectPayload,
  SetSelectedYearPayload,
  UpdateClassPayload,
  UpdateClassSuccessPayload,
} from './payloads/class.actions.payload';

export const createClass = createAction(
  '[Class] Create Class',
  props<CreateClassPayload>()
);
export const createClassSuccess = createAction(
  '[Class] Create Class Success',
  props<CreateClassSuccessPayload>()
);

export const updateClass = createAction(
  '[Class] Update Class',
  props<UpdateClassPayload>()
);
export const updateClassSuccess = createAction(
  '[Class] Update Class Success',
  props<UpdateClassSuccessPayload>()
);

export const loadProfessorClasses = createAction(
  '[Class] Load Professor Classes',
  props<LoadProfessorClassesPayload>()
);

export const loadProfessorClassesSuccess = createAction(
  '[Class] Load Professor Classes Success',
  props<LoadProfessorClassesSuccessPayload>()
);

export const deleteProfessorClass = createAction(
  '[Class] Delete Professor Class',
  props<DeleteProfessorClassPayload>()
);

export const deleteProfessorClassSuccess = createAction(
  '[Class] Delete Professor Class Success'
);

export const selectProfessorClassForDelete = createAction(
  '[Class] Select Professor Class For Delete',
  props<SelectProfessorClassForDeletePayload>()
);

export const selectProfessorClassForEdit = createAction(
  '[Class] Select Professor Class For Edit',
  props<SelectProfessorClassForEditPayload>()
);

export const loadClassByClassId = createAction(
  '[Class] Load Class By Class Id',
  props<LoadClassByClassIdPayload>()
);

export const loadClassByClassIdSuccess = createAction(
  '[Class] Load Class By Class Id Success',
  props<LoadClassByClassIdSuccessPayload>()
);

export const loadUniveristyClasses = createAction(
  '[Class] Load University Classes',
  props<LoadUniversityClassesPayload>()
);

export const loadUniveristyClassesSuccess = createAction(
  '[Class] Load University Classes Success',
  props<LoadUniversityClassesSuccessPayload>()
);

export const setSearchQuery = createAction(
  '[Class] Set Search Query',
  props<SetSearchQueryPayload>()
);

export const setSelectedYear = createAction(
  '[Class] Set Selected Year',
  props<SetSelectedYearPayload>()
);

export const setSelectedSubject = createAction(
  '[Class] Set Selected Subject',
  props<SetSelectedSubjectPayload>()
);
export const reserveSeatInClass = createAction(
  '[Class] Reserve Seat In Class',
  props<ReserveSeatInClassPayload>()
);

export const reserveSeatInClassSuccess = createAction(
  '[Class] Reserve Seat In Class Success',
  props<ReserveSeatInClassSuccessPayload>()
);

export const classFailure = createAction(
  '[Class] Class Failure',
  props<ClassFailurePayload>()
);

export const cancelReservedSeat = createAction(
  '[Class] Cancel Reserved Seat',
  props<CancelReservedSeatPayload>()
);

export const cancelReservedSeatSuccess = createAction(
  '[Class] Cancel Reserved Seat Success',
  props<CancelReservedSeatSuccessPayload>()
);

export const LoadClassesWithStudentReservedSeat = createAction(
  '[Class] Load Classes With Student Reserved Seat',
  props<LoadClassesWithStudentReservedSeatPayload>()
);

export const LoadClassesWithStudentReservedSeatSuccess = createAction(
  '[Class] Load Classes With Student Reserved Seat Success',
  props<LoadClassesWithStudentReservedSeatSuccessPayload>()
);
