import { createAction, props } from '@ngrx/store';
import { User } from './models/user.model';
import { Professor } from './models/professor.model';
import { Student } from './models/student.model';
import { University } from '../education-data/models/university.model';

export const signIn = createAction(
  '[Auth] Sign In',
  props<{ email: string; password: string }>()
);

export const signInSuccess = createAction(
  '[Auth] Sign In Success',
  props<{ token: string; role: string }>()
);

export const signUp = createAction(
  '[Auth] Sign Up',
  props<{ username: string; email: string; password: string; role: string }>()
);

export const signUpSuccess = createAction(
  '[Auth] Sign Up Success',
  props<{ token: string; role: string }>()
);

export const authFailure = createAction(
  '[Auth] Auth Failure',
  props<{ error: { status: number; message: string } }>()
);

export const loadUser = createAction('[Auth] Load User');

export const loadUserSuccess = createAction(
  '[Auth] Load User Success',
  props<{ user: User }>()
);

export const signOut = createAction('[Auth] Sign Out');
export const signOutSuccess = createAction('[Auth] Sign Out Success');

export const updateUserAndCreateProfessor = createAction(
  '[Auth] Update User And Create Professor',
  props<{
    userId: number;
    universityId: number;
    professor: Omit<Professor, 'id'> & { userId: number };
  }>()
);

export const updateUserAndCreateProfessorSuccess = createAction(
  '[Auth] Update User And Create Professor Success',
  props<{
    university: University;
    professor: Professor;
  }>()
);

export const updateUserAndCreateStudent = createAction(
  '[Auth] Update User And Create Student',
  props<{
    userId: number;
    universityId: number;
    student: (Student & { userId: number }) | null;
  }>()
);

export const updateUserAndCreateStudentSuccess = createAction(
  '[Auth] Update User And Create Student Success',
  props<{
    university: University;
    student: Student;
  }>()
);

export const updateUserFailure = createAction(
  '[Auth] Update User Failure',
  props<{ error: { status: number; message: string } }>()
);
