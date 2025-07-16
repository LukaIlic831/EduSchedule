import { createReducer, on } from '@ngrx/store';
import { University } from './models/university.model';
import { StudyProgram } from './models/study-program.model';
import { Subject } from './models/subject.model';
import {
  loadAllClassroomsByUniversityIdSuccess,
  loadAllStudyProgramsByUniversityIdSuccess,
  loadAllSubjectsByStudyProgramIdSuccess,
  loadAllSubjectsByUniversityIdAndStudyProgramIdSuccess,
  loadAllUniversitiesSuccess,
} from './education-data.actions';
import { Classroom } from './models/classrooms.model';

export interface EducationDataState {
  universities: University[] | null;
  studyPrograms: StudyProgram[] | null;
  subjects: Subject[] | null;
  classrooms: Classroom[] | null;
}

const initialState: EducationDataState = {
  universities: null,
  studyPrograms: null,
  subjects: null,
  classrooms: null,
};

export const educationDataReducer = createReducer(
  initialState,
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
  on(loadAllSubjectsByUniversityIdAndStudyProgramIdSuccess, (state, { subjects }) => ({
    ...state,
    subjects,
  }))
);
