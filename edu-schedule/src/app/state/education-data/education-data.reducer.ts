import { createReducer, on } from '@ngrx/store';
import { University } from './models/university.model';
import { StudyProgram } from './models/study-program.model';
import { Subject } from './models/subject.model';
import {
  educationDataFailure,
  loadAllClassroomsByUniversityIdSuccess,
  loadAllStudyProgramsByUniversityIdAndSelectedYearSuccess,
  loadAllStudyProgramsByUniversityIdSuccess,
  loadAllSubjectsByStudyProgramIdSuccess,
  loadAllSubjectsByUniversityIdAndStudyProgramIdSuccess,
  loadAllUniversitiesSuccess,
} from './education-data.actions';
import { Classroom } from './models/classrooms.model';

export interface EducationDataState {
  universities: University[];
  studyPrograms: StudyProgram[];
  subjects: Subject[];
  classrooms: Classroom[];
  error: { status: number; message: string } | null;
}

const initialState: EducationDataState = {
  universities: [],
  studyPrograms: [],
  subjects: [],
  classrooms: [],
  error: null,
};

export const educationDataReducer = createReducer(
  initialState,
  on(educationDataFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(loadAllUniversitiesSuccess, (state, { universities }) => ({
    ...state,
    universities,
  })),
  on(loadAllStudyProgramsByUniversityIdSuccess, (state, { studyPrograms }) => ({
    ...state,
    studyPrograms,
  })),
  on(loadAllSubjectsByStudyProgramIdSuccess, (state, { subjects }) => ({
    ...state,
    subjects,
  })),
  on(loadAllClassroomsByUniversityIdSuccess, (state, { classrooms }) => ({
    ...state,
    classrooms,
  })),
  on(
    loadAllSubjectsByUniversityIdAndStudyProgramIdSuccess,
    (state, { subjects }) => ({
      ...state,
      subjects,
    })
  ),
  on(
    loadAllStudyProgramsByUniversityIdAndSelectedYearSuccess,
    (state, { studyPrograms }) => ({ ...state, studyPrograms })
  )
);
