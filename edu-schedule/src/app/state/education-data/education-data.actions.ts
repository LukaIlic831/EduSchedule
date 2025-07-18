import { createAction, props } from '@ngrx/store';
import { StudyProgram } from './models/study-program.model';
import { University } from './models/university.model';
import { Subject } from './models/subject.model';
import { Classroom } from './models/classrooms.model';

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
  '[Education Data] Load All Study Programs By University Id Success',
  props<{
    studyPrograms: StudyProgram[];
  }>()
);

export const loadAllStudyProgramsByUniversityIdAndSelectedYear = createAction(
  '[Education Data] Load All Study Programs By University Id And Selected Year',
  props<{
    universityId: number;
    selectedYear: number;
  }>()
);

export const loadAllStudyProgramsByUniversityIdAndSelectedYearSuccess =
  createAction(
    '[Education Data] Load All Study Programs By University Id And Selected Year Success',
    props<{
      studyPrograms: StudyProgram[];
    }>()
  );

export const loadAllSubjectsByStudyProgramId = createAction(
  '[Education Data] Load All Subjects By Study Program Id',
  props<{
    studyProgramId: number;
  }>()
);

export const loadAllSubjectsByStudyProgramIdSuccess = createAction(
  '[Education Data] Load All Subjects By Study Program Id Success',
  props<{
    subjects: Subject[];
  }>()
);

export const loadAllClassroomsByUniversityId = createAction(
  '[Education Data] Load All Study Programs By University Id',
  props<{
    universityId: number;
  }>()
);

export const loadAllClassroomsByUniversityIdSuccess = createAction(
  '[Education Data] Load All Classrooms By University Id Success',
  props<{
    classrooms: Classroom[];
  }>()
);

export const loadAllSubjectsByUniversityIdAndStudyProgramId = createAction(
  '[Education Data] Load All Subjects By University Id And Study Program Id',
  props<{
    universityId: number;
    studyProgramId: number;
  }>()
);

export const loadAllSubjectsByUniversityIdAndStudyProgramIdSuccess =
  createAction(
    '[Education Data] Load All Subjects By University And Study Program Id Success',
    props<{
      subjects: Subject[];
    }>()
  );
