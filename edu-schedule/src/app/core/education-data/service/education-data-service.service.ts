import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { University } from '../../../state/education-data/models/university.model';
import { Observable } from 'rxjs';
import { StudyProgram } from '../../../state/education-data/models/study-program.model';
import { Subject } from '../../../state/education-data/models/subject.model';
import { Classroom } from '../../../state/education-data/models/classrooms.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EducationDataServiceService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAllUniversities(): Observable<University[]> {
    return this.http.get<University[]>(this.apiUrl + '/universities');
  }
  getAllStudyProgramsByUniversityIdAndSelectedYear(
    universityId: number,
    selectedYear: number
  ): Observable<University[]> {
    return this.http.get<StudyProgram[]>(
      `${this.apiUrl}/study-programs/university/year`,
      {
        params: { universityId, year: selectedYear },
      }
    );
  }
  getAllStudyProgramsByUniversityId(
    universityId: number
  ): Observable<University[]> {
    return this.http.get<StudyProgram[]>(
      `${this.apiUrl}/study-programs/university`,
      {
        params: { universityId },
      }
    );
  }

  getAllSubjectsByStudyProgramId(
    studyProgramId: number
  ): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/subjects/study-program`, {
      params: { studyProgramId },
    });
  }

  getAllClassroomsByUniversityId(
    universityId: number
  ): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(`${this.apiUrl}/classrooms/university`, {
      params: { universityId },
    });
  }

  getAllSubjectsByUniversityIdAndStudyProgramId(
    universityId: number,
    studyProgramId: number
  ): Observable<Subject[]> {
    return this.http.get<Subject[]>(
      `${this.apiUrl}/subjects/university/study-program`,
      {
        params: { universityId, studyProgramId },
      }
    );
  }
}
