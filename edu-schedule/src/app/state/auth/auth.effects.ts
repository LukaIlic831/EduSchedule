import { inject, Injectable } from '@angular/core';
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
  updateUserFailure,
} from './auth.actions';
import { catchError, filter, map, of, switchMap, take, tap, zip } from 'rxjs';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../core/user/services/user.service';
import { UserInfoService } from '../../feature/user-info/services/user-info.service';

@Injectable()
export class AuthEffects {
  private _snackBar = inject(MatSnackBar);
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private userInfoService: UserInfoService,
    private router: Router
  ) {}
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      switchMap(({ email, password }) =>
        this.authService.signIn({ email, password }).pipe(
          map((response) =>
            signInSuccess({ token: response.token, role: response.role })
          ),
          catchError((errorResponse) => {
            const error = {
              status: errorResponse?.status,
              message: errorResponse?.error?.message,
            };
            return of(authFailure({ error }));
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
          catchError((errorResponse) => {
            const error = {
              status: errorResponse?.status,
              message: errorResponse?.error?.message,
            };
            return of(authFailure({ error }));
          })
        )
      )
    )
  );

  loadUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMap(() =>
        this.authService
          .getCurrentUser()
          .pipe(map((user) => loadUserSuccess({ user })))
      )
    )
  );

  authFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authFailure),
        filter(({ error }) => !!error && error.status !== 404),
        tap(({ error }) => {
          this._snackBar.open(error!.message, 'Dismiss', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
        })
      ),
    { dispatch: false }
  );

  signUpSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signUpSuccess),
        filter(({ token }) => !!token),
        take(1),
        tap(({ role }) => {
          this._snackBar.open('Signup successful!', 'Dismiss', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
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
        take(1),
        tap(({ role }) => {
          this._snackBar.open('Signin successful!', 'Dismiss', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
          this.router.navigate([
            role === 'S' ? '/student-info' : '/professor-info',
          ]);
        })
      ),
    { dispatch: false }
  );

  afterAuthLoadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpSuccess, signInSuccess),
      filter(({ token }) => !!token),
      map(() => loadUser())
    )
  );

  afterUserInfoUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        updateUserAndCreateStudentSuccess,
        updateUserAndCreateProfessorSuccess
      ),
      map(() => loadUser())
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOut),
      switchMap(() =>
        this.authService.signOutCurrentUser().pipe(
          map(() => signOutSuccess()),
          catchError((errorResponse) => {
            const error = {
              status: errorResponse?.status,
              message: errorResponse?.error?.message,
            };
            return of(authFailure({ error }));
          })
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
          this._snackBar.open('Signed out successfully!', 'Dismiss', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
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
          this.userInfoService.createProfessor(professor)
        ).pipe(
          map(([university, professor]) =>
            updateUserAndCreateProfessorSuccess({ university, professor })
          ),
          catchError((errorResponse) => {
            const error = {
              status: errorResponse?.status,
              message: errorResponse?.error?.message,
            };
            return of(updateUserFailure({ error }));
          })
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
          this.userInfoService.createStudent(student)
        ).pipe(
          map(([university, student]) =>
            updateUserAndCreateStudentSuccess({ university, student })
          ),
          catchError((errorResponse) => {
            const error = {
              status: errorResponse?.status,
              message: errorResponse?.error?.message,
            };
            return of(updateUserFailure({ error }));
          })
        )
      )
    )
  );

  updateUserAndCreateStudentSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateUserAndCreateStudentSuccess),
        tap(() => {
          this._snackBar.open('Data saved successfully!', 'Dismiss', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
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
          this._snackBar.open('Data saved successfully!', 'Dismiss', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
          this.router.navigate(['/professor-dashboard']);
        })
      ),
    { dispatch: false }
  );

  updateUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateUserFailure),
        filter(({ error }) => !!error && error.status !== 404),
        tap(({ error }) => {
          this._snackBar.open(error!.message, 'Dismiss', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
        })
      ),
    { dispatch: false }
  );
}
