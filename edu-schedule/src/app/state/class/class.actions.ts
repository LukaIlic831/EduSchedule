import { createAction, props } from '@ngrx/store';
import { ClassModel } from './models/class.model';
import { ClassDto } from './models/class-dto.model';

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
