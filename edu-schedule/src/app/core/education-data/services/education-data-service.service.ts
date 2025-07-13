import { Injectable } from '@angular/core';
import { APIURL } from '../../../data/data';
import { HttpClient } from '@angular/common/http';
import { University } from '../../../state/education-data/models/university.model';
import { Observable } from 'rxjs';
import { StudyProgram } from '../../../state/education-data/models/study-program.model';

@Injectable({
  providedIn: 'root',
})
export class EducationDataServiceService {
  private apiUrl = APIURL;
  constructor(private http: HttpClient) {}
  getAllUniversities(): Observable<University[]> {
    return this.http.get<University[]>(this.apiUrl + '/universities');
  }
  getAllStudyProgramsByUniversityId(
    universityId: number
  ): Observable<University[]> {
    return this.http.get<StudyProgram[]>(
      `${this.apiUrl}/study-programs/university`,
      {
        params: { universityId: universityId },
      }
    );
  }
}
