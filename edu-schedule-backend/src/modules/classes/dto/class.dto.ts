import { Classroom } from 'src/modules/classrooms/classroom.entity';
import { ClassroomDto } from 'src/modules/classrooms/dto/classroom.dto';
import { SeatDto } from 'src/modules/seats/dto/seat.dto';
import { StudyProgram } from 'src/modules/study-programs/study-program.entity';
import { Subject } from 'src/modules/subjects/subject.entity';
import { University } from 'src/modules/universities/university.entity';

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
  classroom: ClassroomDto;
  subject: Subject & { studyProgram: StudyProgram };
  university: University;
}
