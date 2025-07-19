import { University } from '../../education-data/models/university.model';
import { Professor } from './professor.model';
import { Student } from './student.model';
import { User } from './user.model';

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInSuccessPayload {
  token: string;
  role: string;
}

export interface SignUpPayload {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface SignUpSuccessPayload extends SignInSuccessPayload {}

export interface LoadUserSuccessPayload {
  user: User;
}

export interface UpdateUserAndCreateProfessorPayload {
  userId: number;
  universityId: number;
  professor: {
    title: string;
  };
}

export interface UpdateUserAndCreateProfessorSuccessPayload {
  university: University;
  professor: Professor;
}

export interface UpdateUserAndCreateStudentPayload {
  userId: number;
  universityId: number;
  student: {
    index: number;
    year: number;
    studyProgramId: number;
  };
}

export interface UpdateUserAndCreateStudentSuccessPayload {
  university: University;
  student: Student;
}

export interface AuthFailurePayload {
  error: { status: number; message: string };
}
