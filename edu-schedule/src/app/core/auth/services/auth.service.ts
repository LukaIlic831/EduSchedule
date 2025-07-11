import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIURL } from '../../../data/data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = APIURL;
  constructor(private http: HttpClient) {}

  signIn(userData: any): Observable<any> {
    const userDataToSend = {
      email: userData.email,
      password: userData.password,
    };
    return this.http.post(this.apiUrl + '/auth/log-in', userDataToSend);
  }
}
