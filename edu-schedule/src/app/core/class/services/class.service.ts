import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL } from '../../../data/data';
import { Observable } from 'rxjs';
import { ClassModel } from '../../../state/class/models/class.model';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private apiUrl = APIURL;
  constructor(private http: HttpClient) {}

  createClass(classData: any): Observable<ClassModel> {
    return this.http.post<ClassModel>(
      `${this.apiUrl}/classes/create`,
      classData
    );
  }

  getAllProfessorClasses(professorId: number): Observable<ClassModel[]> {
    return this.http.get<ClassModel[]>(`${this.apiUrl}/classes/professor`, {
      params: { professorId: professorId },
    });
  }

  deleteProfessorClass(classId: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/classes/delete`, {
      params: { classId: classId },
    });
  }
}
