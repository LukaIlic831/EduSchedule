import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassModel } from '../../../state/class/models/class.model';
import { CreateClassDto } from '../../../dto/class/create-class.dto';
import { environment } from '../../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  createClass(classData: CreateClassDto): Observable<ClassModel> {
    return this.http.post<ClassModel>(
      `${this.apiUrl}/classes/create`,
      classData
    );
  }

  getAllProfessorClasses(professorId: number): Observable<ClassModel[]> {
    return this.http.get<ClassModel[]>(`${this.apiUrl}/classes/professor`, {
      params: { professorId },
    });
  }

  getAllUniversityClassesByStudyProgramId(
    universityId: number,
    studyProgramId: number
  ): Observable<ClassModel[]> {
    return this.http.get<ClassModel[]>(
      `${this.apiUrl}/classes/university/study-program`,
      {
        params: { universityId: universityId, studyProgramId: studyProgramId },
      }
    );
  }

  deleteProfessorClass(classId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/classes/delete`, {
      params: { classId: classId },
    });
  }

  getClass(classId: number): Observable<ClassModel> {
    return this.http.get<ClassModel>(`${this.apiUrl}/classes/class`, {
      params: { classId: classId },
    });
  }
}
