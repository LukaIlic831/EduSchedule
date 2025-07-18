import { StudyProgram } from "../../education-data/models/study-program.model";

export interface Student {
    userId:number;
    index: number;
    year: number;
    studyProgram: StudyProgram;
}