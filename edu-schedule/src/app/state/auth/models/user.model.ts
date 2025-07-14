import { University } from '../../education-data/models/university.model';
import { Professor } from './professor.model';
import { Student } from './student.model';

export interface User {
  id: number;
  email: string;
  username: string;
  university: University | null;
  role: 'S' | 'P';
  student: Student | null;
  professor: Professor | null;
}
