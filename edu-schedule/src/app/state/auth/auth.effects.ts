import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  authFailure,
  loadUser,
  loadUserSuccess,
  signIn,
  signInSuccess,
  signOut,
  signOutSuccess,
  signUp,
  signUpSuccess,
  updateUserAndCreateProfessor,
  updateUserAndCreateProfessorSuccess,
  updateUserAndCreateStudent,
  updateUserAndCreateStudentSuccess,
} from './auth.actions';
import { catchError, filter, map, of, switchMap, tap, zip } from 'rxjs';
import { AuthService } from '../../core/auth/service/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../core/user/service/user.service';
import { UserInfoService } from '../../feature/user-info/services/user-info.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private userInfoService: UserInfoService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      switchMap(({ email, password }) =>
        this.authService.signIn({ email, password }).pipe(
          map((response) =>
            signInSuccess({ token: response.token, role: response.role })
          ),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authFailure({
                error: {
                  message: errorResponse.error.message,
                  status: errorResponse.status,
                },
              })
            );
          })
        )
      )
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      switchMap(({ username, email, password, role }) =>
        this.authService.signUp({ username, email, password, role }).pipe(
          map((response) =>
            signUpSuccess({
              token: response.token,
              role: response.role,
            })
          ),
          catchError((errorResponse) => this.errorHandling(errorResponse))
        )
      )
    )
  );

  loadUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMap(() =>
        this.authService.getCurrentUser().pipe(
          map((response) =>
            loadUserSuccess({ user: response.user, token: response.token })
          ),
          catchError((errorResponse) => this.errorHandling(errorResponse))
        )
      )
    )
  );

  authFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authFailure),
        tap(({ error }) => {
          error.status === 401 && this.router.navigate(['/sign-in']);
          this.snackbarService.showError(error!.message);
        })
      ),
    { dispatch: false }
  );

  signUpSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signUpSuccess),
        filter(({ token }) => !!token),
        tap(({ role }) => {
          this.snackbarService.showSuccess('Sign up successful!');
          this.router.navigate([
            role === 'S' ? '/student-info' : '/professor-info',
          ]);
        })
      ),
    { dispatch: false }
  );

  signInSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signInSuccess),
        filter(({ token }) => !!token),
        tap(({ role }) => {
          this.snackbarService.showSuccess('Sign in successful!');
          this.router.navigate([
            role === 'S' ? '/student-info' : '/professor-info',
          ]);
        })
      ),
    { dispatch: false }
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOut),
      switchMap(() =>
        this.authService.signOutCurrentUser().pipe(
          map(() => signOutSuccess()),
          catchError((errorResponse) => this.errorHandling(errorResponse))
        )
      )
    )
  );

  signOutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signOutSuccess),
        tap(() => {
          this.router.navigate(['/sign-in']);
          this.snackbarService.showSuccess('Sign out successfully!');
        })
      ),
    { dispatch: false }
  );

  updateUserAndCreateProfessor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserAndCreateProfessor),
      switchMap(({ professor, universityId, userId }) =>
        zip(
          this.userService.updateCurrentUserUniversity(userId, universityId),
          this.userInfoService.createProfessor(professor, userId)
        ).pipe(
          map(([university, professor]) =>
            updateUserAndCreateProfessorSuccess({ university, professor })
          ),
          catchError((errorResponse) => this.errorHandling(errorResponse))
        )
      )
    )
  );

  updateUserAndCreateStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserAndCreateStudent),
      switchMap(({ student, universityId, userId }) =>
        zip(
          this.userService.updateCurrentUserUniversity(userId, universityId),
          this.userInfoService.createStudent(student, universityId, userId)
        ).pipe(
          map(([university, student]) =>
            updateUserAndCreateStudentSuccess({ university, student })
          ),
          catchError((errorResponse) => this.errorHandling(errorResponse))
        )
      )
    )
  );

  updateUserAndCreateStudentSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateUserAndCreateStudentSuccess),
        tap(() => {
          this.snackbarService.showSuccess('Data saved successfully!');
          this.router.navigate(['/search']);
        })
      ),
    { dispatch: false }
  );

  updateUserAndCreateProfessorSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateUserAndCreateProfessorSuccess),
        tap(() => {
          this.snackbarService.showSuccess('Data saved successfully!');
          this.router.navigate(['/professor-dashboard']);
        })
      ),
    { dispatch: false }
  );

  errorHandling(errorResponse: HttpErrorResponse) {
    return of(
      authFailure({
        error: {
          message: errorResponse.error.message,
          status: errorResponse.status,
        },
      })
    );
  }
}
