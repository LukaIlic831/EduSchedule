import { StudyProgram } from "../../education-data/models/study-program.model";

export interface Student {
    index: number;
    year: number;
    studyProgram: StudyProgram;
}