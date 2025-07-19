import { createAction, props } from '@ngrx/store';
import {
  EducationDataFailurePayload,
  LoadAllClassroomsByUniversityIdPayload,
  LoadAllClassroomsByUniversityIdSuccessPayload,
  LoadAllStudyProgramsByUniversityIdAndSelectedYearPayload,
  LoadAllStudyProgramsByUniversityIdAndSelectedYearSuccessPayload,
  LoadAllStudyProgramsByUniversityIdPayload,
  LoadAllStudyProgramsByUniversityIdSuccessPayload,
  LoadAllSubjectsByStudyProgramIdPayload,
  LoadAllSubjectsByStudyProgramIdSuccessPayload,
  LoadAllSubjectsByUniversityIdAndStudyProgramIdPayload,
  LoadAllSubjectsByUniversityIdAndStudyProgramIdSuccessPayload,
  LoadAllUniversitiesSuccessPayload,
} from './models/education-data.actions.payload';

export const loadAllUniversities = createAction(
  '[Education Data] Load All Universities'
);

export const loadAllUniversitiesSuccess = createAction(
  '[Education Data] Load All Universities Success',
  props<LoadAllUniversitiesSuccessPayload>()
);

export const loadAllStudyProgramsByUniversityId = createAction(
  '[Education Data] Load All Study Programs By University Id',
  props<LoadAllStudyProgramsByUniversityIdPayload>()
);

export const loadAllStudyProgramsByUniversityIdSuccess = createAction(
  '[Education Data] Load All Study Programs By University Id Success',
  props<LoadAllStudyProgramsByUniversityIdSuccessPayload>()
);

export const loadAllStudyProgramsByUniversityIdAndSelectedYear = createAction(
  '[Education Data] Load All Study Programs By University Id And Selected Year',
  props<LoadAllStudyProgramsByUniversityIdAndSelectedYearPayload>()
);

export const loadAllStudyProgramsByUniversityIdAndSelectedYearSuccess =
  createAction(
    '[Education Data] Load All Study Programs By University Id And Selected Year Success',
    props<LoadAllStudyProgramsByUniversityIdAndSelectedYearSuccessPayload>()
  );

export const loadAllSubjectsByStudyProgramId = createAction(
  '[Education Data] Load All Subjects By Study Program Id',
  props<LoadAllSubjectsByStudyProgramIdPayload>()
);

export const loadAllSubjectsByStudyProgramIdSuccess = createAction(
  '[Education Data] Load All Subjects By Study Program Id Success',
  props<LoadAllSubjectsByStudyProgramIdSuccessPayload>()
);

export const loadAllClassroomsByUniversityId = createAction(
  '[Education Data] Load All Study Programs By University Id',
  props<LoadAllClassroomsByUniversityIdPayload>()
);

export const loadAllClassroomsByUniversityIdSuccess = createAction(
  '[Education Data] Load All Classrooms By University Id Success',
  props<LoadAllClassroomsByUniversityIdSuccessPayload>()
);

export const loadAllSubjectsByUniversityIdAndStudyProgramId = createAction(
  '[Education Data] Load All Subjects By University Id And Study Program Id',
  props<LoadAllSubjectsByUniversityIdAndStudyProgramIdPayload>()
);

export const loadAllSubjectsByUniversityIdAndStudyProgramIdSuccess =
  createAction(
    '[Education Data] Load All Subjects By University And Study Program Id Success',
    props<LoadAllSubjectsByUniversityIdAndStudyProgramIdSuccessPayload>()
  );

export const educationDataFailure = createAction(
  '[Education Data] Education Data Failure',
  props<EducationDataFailurePayload>()
);
