import { Classroom } from "../models/classrooms.model";
import { StudyProgram } from "../models/study-program.model";
import { Subject } from "../models/subject.model";
import { University } from "../models/university.model";


export interface LoadAllUniversitiesSuccessPayload {
  universities: University[];
}

export interface LoadAllStudyProgramsByUniversityIdPayload {
  universityId: number;
}

export interface LoadAllStudyProgramsByUniversityIdSuccessPayload {
  studyPrograms: StudyProgram[];
}

export interface LoadAllStudyProgramsByUniversityIdAndSelectedYearPayload {
  universityId: number;
  selectedYear: number;
}

export interface LoadAllStudyProgramsByUniversityIdAndSelectedYearSuccessPayload {
  studyPrograms: StudyProgram[];
}

export interface LoadAllSubjectsByStudyProgramIdPayload {
  studyProgramId: number;
}

export interface LoadAllSubjectsByStudyProgramIdSuccessPayload {
  subjects: Subject[];
}

export interface LoadAllClassroomsByUniversityIdPayload {
  universityId: number;
}

export interface LoadAllClassroomsByUniversityIdSuccessPayload {
  classrooms: Classroom[];
}

export interface LoadAllSubjectsByUniversityIdAndStudyProgramIdPayload {
  universityId: number;
  studyProgramId: number;
}

export interface LoadAllSubjectsByUniversityIdAndStudyProgramIdSuccessPayload {
  subjects: Subject[];
}

export interface EducationDataFailurePayload {
  error: { status: number; message: string };
}
