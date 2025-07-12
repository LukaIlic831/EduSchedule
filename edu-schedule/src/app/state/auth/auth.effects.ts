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
} from './auth.actions';
import { catchError, filter, map, of, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthEffects {
  private _snackBar = inject(MatSnackBar);
  constructor(
    private actions$: Actions,
    private authService: AuthService,
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
}
