import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Student } from '../../../state/auth/models/student.model';
import { Professor } from '../../../state/auth/models/professor.model';
import { CreateStudentDto } from '../../../dto/student/create-student.dto';
import { CreateProfessorDto } from '../../../dto/professor/create-professor.dto';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  createStudent(
    studentData: CreateStudentDto,
    universityId: number,
    userId: number
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/students/create`, studentData, {
      params: { universityId, userId },
    });
  }
  createProfessor(
    professorData: CreateProfessorDto,
    userId: number
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/professors/create`, professorData, {
      params: { userId },
    });
  }
}
