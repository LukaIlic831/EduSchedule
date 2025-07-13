import { createAction, props } from '@ngrx/store';
import { StudyProgram } from './models/study-program.model';
import { University } from './models/university.model';

export const loadAllUniversities = createAction(
  '[Education Data] Load All Universities'
);

export const loadAllUniversitiesSuccess = createAction(
  '[Education Data] Load All Universities Success',
  props<{
    universities: University[];
  }>()
);

export const loadAllStudyProgramsByUniversityId = createAction(
  '[Education Data] Load All Study Programs By University Id',
  props<{
    universityId: number;
  }>()
);

export const loadAllStudyProgramsByUniversityIdSuccess = createAction(
  '[Education Data] Load All Study Programs By University IdSuccess',
  props<{
    studyPrograms: StudyProgram[];
  }>()
);
