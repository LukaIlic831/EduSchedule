import { Classroom } from 'src/modules/classrooms/classroom.entity';
import { Professor } from 'src/modules/professors/professor.entity';
import { SeatDto } from 'src/modules/seats/dto/seat.dto';
import { StudyProgram } from 'src/modules/study-programs/study-program.entity';
import { Subject } from 'src/modules/subjects/subject.entity';
import { University } from 'src/modules/universities/university.entity';

export interface ClassDto {
  professor: Pick<Professor, 'id' | 'title'> & { username: string };
  id: number;
  lectureTitle: string;
  lectureDesc: string;
  startTime: Date;
  endTime: Date;
  classroom: Classroom;
  reservedSeats: SeatDto[];
  subject: Subject & { studyProgram: StudyProgram };
  university: University;
  availableSeats: number;
}
