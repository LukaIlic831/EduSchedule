import { createReducer, on } from '@ngrx/store';
import { University } from './models/university.model';
import { StudyProgram } from './models/study-program.model';
import { Subject } from './models/subject.model';
import {
  educationDataFailure,
  loadAllClassroomsByUniversityId,
  loadAllClassroomsByUniversityIdSuccess,
  loadAllStudyProgramsByUniversityId,
  loadAllStudyProgramsByUniversityIdAndSelectedYearSuccess,
  loadAllStudyProgramsByUniversityIdSuccess,
  loadAllSubjectsByStudyProgramIdSuccess,
  loadAllSubjectsByUniversityIdAndStudyProgramId,
  loadAllSubjectsByUniversityIdAndStudyProgramIdSuccess,
  loadAllUniversities,
  loadAllUniversitiesSuccess,
} from './education-data.actions';
import { Classroom } from './models/classrooms.model';

export interface EducationDataState {
  universities: University[];
  studyPrograms: StudyProgram[];
  subjects: Subject[];
  classrooms: Classroom[];
  error: { status: number; message: string } | null;
  loading: boolean;
}

const initialState: EducationDataState = {
  universities: [],
  studyPrograms: [],
  subjects: [],
  classrooms: [],
  error: null,
  loading: false,
};

export const educationDataReducer = createReducer(
  initialState,
  on(
    loadAllUniversities,
    loadAllStudyProgramsByUniversityId,
    loadAllClassroomsByUniversityId,
    loadAllSubjectsByUniversityIdAndStudyProgramId,
    (state) => ({ ...state, loading: true })
  ),
  on(educationDataFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(loadAllUniversitiesSuccess, (state, { universities }) => ({
    ...state,
    universities,
    loading: false,
  })),
  on(loadAllStudyProgramsByUniversityIdSuccess, (state, { studyPrograms }) => ({
    ...state,
    studyPrograms,
    loading: false,
  })),
  on(loadAllSubjectsByStudyProgramIdSuccess, (state, { subjects }) => ({
    ...state,
    subjects,
  })),
  on(loadAllClassroomsByUniversityIdSuccess, (state, { classrooms }) => ({
    ...state,
    classrooms,
    loading: false,
  })),
  on(
    loadAllSubjectsByUniversityIdAndStudyProgramIdSuccess,
    (state, { subjects }) => ({
      ...state,
      subjects,
      loading: false,
    })
  ),
  on(
    loadAllStudyProgramsByUniversityIdAndSelectedYearSuccess,
    (state, { studyPrograms }) => ({ ...state, studyPrograms })
  )
);
