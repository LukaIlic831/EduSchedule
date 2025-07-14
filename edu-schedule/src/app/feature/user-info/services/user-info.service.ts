import { Injectable } from '@angular/core';
import { APIURL } from '../../../data/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private apiUrl = APIURL;
  constructor(private http: HttpClient) {}

  createStudent(studentData: any): Observable<any> {
    const dataToSend = {
      index: studentData.index,
      userId: studentData.userId,
      studyProgramId: studentData.studyProgramId,
      year: studentData.year,
    };
    return this.http.post(`${this.apiUrl}/students/create`, dataToSend);
  }
  createProfessor(professorData: any): Observable<any> {
    const dataToSend = {
      title: professorData.title,
      userId: professorData.userId,
    };
    return this.http.post(`${this.apiUrl}/professors/create`, dataToSend);
  }
}
