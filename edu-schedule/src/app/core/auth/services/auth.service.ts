import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api';
  constructor(private http: HttpClient) {}

  signIn(userData: any): Observable<any> {
    const userDataToSend = {
      email: userData.email,
      password: userData.password,
    };
    return this.http.post(this.apiUrl + '/auth/login', userDataToSend);
  }
}
