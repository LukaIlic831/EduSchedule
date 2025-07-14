import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL } from '../../../data/data';
import { Observable } from 'rxjs';
import { University } from '../../../state/education-data/models/university.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = APIURL;
  constructor(private http: HttpClient) {}
  updateCurrentUserUniversity(
    userId: number,
    universityId: number
  ): Observable<University> {
    return this.http.put<University>(`${this.apiUrl}/users/${userId}/university`, {
      universityId,
    });
  }
}
