import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  signIn,
  signInFailure,
  signInSuccess,
  signUp,
  signUpSuccess,
} from './auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../core/auth/services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}
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
            return of(signInFailure({ error }));
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
            return of(signInFailure({ error }));
          })
        )
      )
    )
  );
}
