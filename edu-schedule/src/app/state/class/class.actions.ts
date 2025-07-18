import { createAction, props } from '@ngrx/store';
import { ClassModel } from './models/class.model';
import { ClassDto } from './models/class-dto.model';
import { createSeatDto } from './dto/create-seat.dto';
import { Seat } from '../education-data/models/seat.model';

export const createClass = createAction(
  '[Class] Create Class',
  props<{
    classDto: ClassDto;
  }>()
);
export const createClassSuccess = createAction(
  '[Class] Create Class Success',
  props<{ createdClass: ClassModel }>()
);
export const createClassFailure = createAction(
  '[Class] Create Class Failure',
  props<{ error: { status: number; message: string } }>()
);

export const loadProfessorClasses = createAction(
  '[Class] Load Professor Classes',
  props<{ professorId: number }>()
);

export const loadProfessorClassesSuccess = createAction(
  '[Class] Load Professor Classes Success',
  props<{ classes: ClassModel[] }>()
);

export const deleteProfessorClass = createAction(
  '[Class] Delete Professor Class',
  props<{ classId: number }>()
);

export const deleteProfessorClassSuccess = createAction(
  '[Class] Delete Professor Class Success'
);

export const selectProfessorClassForDelete = createAction(
  '[Class] Select Professor Class For Delete',
  props<{ selectedClass: ClassModel }>()
);

export const loadClassByClassId = createAction(
  '[Class] Load Class By Class Id',
  props<{ classId: number }>()
);

export const loadClassByClassIdSuccess = createAction(
  '[Class] Load Class By Class Id Success',
  props<{ loadedClass: ClassModel }>()
);

export const loadUniveristyClasses = createAction(
  '[Class] Load University Classes',
  props<{ universityId: number; studyProgramId: number }>()
);

export const loadUniveristyClassesSuccess = createAction(
  '[Class] Load University Classes Success',
  props<{ classes: ClassModel[] }>()
);

export const setSearchQuery = createAction(
  '[Class] Set Search Query',
  props<{ searchQuery: string }>()
);

export const setSelectedYear = createAction(
  '[Class] Set Selected Year',
  props<{ selectedYear: number }>()
);

export const setSelectedSubject = createAction(
  '[Class] Set Selected Subject',
  props<{ selectedSubjectId: number }>()
);

export const reserveSeatInClass = createAction(
  '[Class] Reserve Seat In Class',
  props<{ seatForReservation: createSeatDto }>()
);

export const reserveSeatInClassSuccess = createAction(
  '[Class] Reserve Seat In Class Success',
  props<{ reservedSeat: Seat }>()
);

export const reserveSeatInClassFailure = createAction(
  '[Class] Reserve Seat In Class Failure'
);
