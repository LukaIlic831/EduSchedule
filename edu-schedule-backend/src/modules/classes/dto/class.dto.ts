import { Classroom } from "src/modules/classrooms/classroom.entity";
import { Subject } from "src/modules/subjects/subject.entity";
import { University } from "src/modules/universities/university.entity";

export interface ClassDto {
  professor: {
    id: number;
    title: string;
    username: string;
  };
  id: number;
  lectureTitle: string;
  lectureDesc: string;
  startTime: Date;
  endTime: Date;
  classroom: Classroom;
  subject: Subject;
  university: University;
}
