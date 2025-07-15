import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  createClass,
  createClassFailure,
  createClassSuccess,
  deleteProfessorClass,
  deleteProfessorClassSuccess,
  loadProfessorClasses,
  loadProfessorClassesSuccess,
} from './class.actions';
import { ClassService } from '../../core/class/services/class.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ClassEffects {
  private _snackBar = inject(MatSnackBar);
  constructor(
    private actions$: Actions,
    private classService: ClassService,
    private router: Router
  ) {}

  createClass$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createClass),
      switchMap(({ classDto }) =>
        this.classService.createClass(classDto).pipe(
          map((createdClass) => createClassSuccess({ createdClass })),
          catchError((errorResponse) => {
            const error = {
              status: errorResponse?.status,
              message: errorResponse?.error?.message,
            };
            return of(createClassFailure({ error }));
          })
        )
      )
    )
  );

  createClassSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createClassSuccess),
        tap(() => {
          this._snackBar.open('Class created successfully!', 'Dismiss', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
          this.router.navigate(['/professor-dashboard']);
        })
      ),
    { dispatch: false }
  );

  createClassFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createClassFailure),
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

  loadClasses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfessorClasses),
      switchMap(({ professorId }) =>
        this.classService.getAllProfessorClasses(professorId).pipe(
          map((professorClasses) =>
            professorClasses.map((professorClass) => {
              const formattedDate = new Date(
                professorClass.startTime
              ).toLocaleDateString();
              const formattedStartTime = new Date(
                professorClass.startTime
              ).toLocaleTimeString();
              const formattedEndTime = new Date(
                professorClass.endTime
              ).toLocaleTimeString();

              return {
                ...professorClass,
                dateAndTimeFormatted: `${formattedDate} | ${formattedStartTime} - ${formattedEndTime}`,
              };
            })
          ),
          map((formattedClasses) =>
            loadProfessorClassesSuccess({ classes: formattedClasses })
          )
        )
      )
    )
  );

  deleteProfessorClass$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProfessorClass),
      switchMap(({ classId }) =>
        this.classService
          .deleteProfessorClass(classId)
          .pipe(map(() => deleteProfessorClassSuccess()))
      )
    )
  );

  deleteProfessorClassSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteProfessorClassSuccess),
        tap(() => {
          this._snackBar.open('Class deleted successfully!', 'Dismiss', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
        })
      ),
    { dispatch: false }
  );
}
