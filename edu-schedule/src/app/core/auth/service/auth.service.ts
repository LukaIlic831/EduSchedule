import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInUserDto } from '../../../dto/auth/sign-in-user.dto';
import { AuthSuccessDto } from '../../../dto/auth/auth-success.dto';
import { SignUpUserDto } from '../../../dto/auth/sign-up-user.dto';
import { environment } from '../../../../environments/environment.development';
import { authUser } from '../../../dto/auth/user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  signIn(userData: SignInUserDto): Observable<AuthSuccessDto> {
    return this.http.post<AuthSuccessDto>(
      this.apiUrl + '/auth/sign-in',
      userData,
      {
        withCredentials: true,
      }
    );
  }

  signUp(userData: SignUpUserDto): Observable<any> {
    return this.http.post<AuthSuccessDto>(
      this.apiUrl + '/auth/sign-up',
      userData,
      {
        withCredentials: true,
      }
    );
  }

  getCurrentUser(): Observable<authUser> {
    return this.http.get<authUser>(this.apiUrl + '/auth/user', {
      withCredentials: true,
    });
  }

  signOutCurrentUser(): Observable<void> {
    return this.http.get<void>(this.apiUrl + '/auth/sign-out', {
      withCredentials: true,
    });
  }
}
