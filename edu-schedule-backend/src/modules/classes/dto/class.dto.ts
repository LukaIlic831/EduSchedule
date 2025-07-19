import { ClassroomDto } from 'src/modules/classrooms/dto/classroom.dto';
import { Professor } from 'src/modules/professors/professor.entity';
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
  classroom: ClassroomDto;
  subject: Subject & { studyProgram: StudyProgram };
  university: University;
}
