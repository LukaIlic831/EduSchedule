import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIURL } from '../../../data/data';
import { User } from '../../../state/auth/models/user.model';

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
    return this.http.post(this.apiUrl + '/auth/log-in', userDataToSend, {
      withCredentials: true,
    });
  }

  signUp(userData: any): Observable<any> {
    const userDataToSend = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    };
    return this.http.post(this.apiUrl + '/auth/sign-up', userDataToSend, {
      withCredentials: true,
    });
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/auth/user', {
      withCredentials: true,
    });
  }

  signOutCurrentUser(): Observable<any> {
    return this.http.get(this.apiUrl + '/auth/sign-out', {
      withCredentials: true,
    });
  }
}
