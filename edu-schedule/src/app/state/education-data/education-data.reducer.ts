import { createReducer, on } from '@ngrx/store';
import { University } from './models/university.model';
import { StudyProgram } from './models/study-program.model';
import { Subject } from './models/subject.model';
import {
  loadAllStudyProgramsByUniversityIdSuccess,
  loadAllUniversitiesSuccess,
} from './education-data.actions';

export interface EducationDataState {
  universities: University[] | null;
  studyPrograms: StudyProgram[] | null;
  subjects: Subject[] | null;
}

const initialState: EducationDataState = {
  universities: null,
  studyPrograms: null,
  subjects: null,
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
  }))
);
