import { Professor } from '../../auth/models/professor.model';
import { User } from '../../auth/models/user.model';
import { Classroom } from '../../education-data/models/classrooms.model';
import { Subject } from '../../education-data/models/subject.model';
import { University } from '../../education-data/models/university.model';

export interface ClassModel {
  id: number;
  lectureTitle: string;
  lectureDesc: string;
  startTime: string;
  endTime: string;
  classroom: Classroom;
  subject: Subject;
  professor: Professor & Pick<User, 'username'>;
  university: University;
}
