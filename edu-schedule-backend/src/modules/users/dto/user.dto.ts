import { Professor } from 'src/modules/professors/professor.entity';
import { Student } from 'src/modules/students/student.entity';
import { University } from 'src/modules/universities/university.entity';

export interface UserDto {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: Date;
  professor: Professor;
  student: Student;
  university: University;
}
