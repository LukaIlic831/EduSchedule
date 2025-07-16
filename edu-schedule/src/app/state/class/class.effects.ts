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
  loadClassByClassId,
  loadClassByClassIdSuccess,
  loadProfessorClasses,
  loadProfessorClassesSuccess,
  loadUniveristyClasses,
  loadUniveristyClassesSuccess,
} from './class.actions';
import { ClassService } from '../../core/class/services/class.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassModel } from './models/class.model';

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
            loadProfessorClassesSuccess({
              classes: professorClasses.map((professorClass) =>
                this.handleFormatingDateAndTime(professorClass)
              ),
            })
          )
        )
      )
    )
  );

  loadUniversityClasses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUniveristyClasses),
      switchMap(({ universityId, studyProgramId }) =>
        this.classService.getAllUniversityClassesByStudyProgramId(universityId, studyProgramId).pipe(
          map((universityClasses) =>
            loadUniveristyClassesSuccess({
              classes: universityClasses.map((universityClass) =>
                this.handleFormatingDateAndTime(universityClass)
              ),
            })
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

  loadClass$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadClassByClassId),
      switchMap(({ classId }) =>
        this.classService.getClass(classId).pipe(
          map((loadedClass) =>
            loadClassByClassIdSuccess({
              loadedClass: this.handleFormatingDateAndTime(loadedClass),
            })
          )
        )
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

  handleFormatingDateAndTime(loadedClass: ClassModel) {
    const formattedDate = new Date(loadedClass.startTime).toLocaleDateString();
    const formattedStartTime = new Date(
      loadedClass.startTime
    ).toLocaleTimeString();
    const formattedEndTime = new Date(loadedClass.endTime).toLocaleTimeString();

    return {
      ...loadedClass,
      dateAndTimeFormatted: `${formattedDate} | ${formattedStartTime} - ${formattedEndTime}`,
    };
  }
}
