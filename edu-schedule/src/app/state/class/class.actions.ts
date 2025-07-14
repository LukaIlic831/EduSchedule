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
