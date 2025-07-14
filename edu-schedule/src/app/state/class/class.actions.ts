import { createAction, props } from '@ngrx/store';
import { ClassModel } from './models/class.model';
import { Classroom } from '../education-data/models/classrooms.model';
import { Subject } from '../education-data/models/subject.model';
import { Professor } from '../auth/models/professor.model';
import { University } from '../education-data/models/university.model';
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
