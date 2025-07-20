import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  classFailure,
  createClass,
  createClassSuccess,
  deleteProfessorClass,
  deleteProfessorClassSuccess,
  loadClassByClassId,
  loadClassByClassIdSuccess,
  loadProfessorClasses,
  loadProfessorClassesSuccess,
  loadUniveristyClasses,
  loadUniveristyClassesSuccess,
  reserveSeatInClass,
  reserveSeatInClassSuccess,
} from './class.actions';
import { ClassService } from '../../core/class/service/class.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassModel } from './models/class.model';
import { SeatService } from '../../core/seat/service/seat.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ClassEffects {
  private _snackBar = inject(MatSnackBar);
  constructor(
    private actions$: Actions,
    private classService: ClassService,
    private seatService: SeatService,
    private router: Router
  ) {}

  createClass$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createClass),
      switchMap(({ classForCreate }) =>
        this.classService.createClass(classForCreate).pipe(
          map((createdClass) => createClassSuccess({ createdClass })),
          catchError((errorResponse) => this.errorHandling(errorResponse))
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

  classFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(classFailure),
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
          ),
          catchError((errorResponse) => this.errorHandling(errorResponse))
        )
      )
    )
  );

  loadUniversityClasses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUniveristyClasses),
      switchMap(({ universityId, studyProgramId }) =>
        this.classService
          .getAllUniversityClassesByStudyProgramId(universityId, studyProgramId)
          .pipe(
            map((universityClasses) =>
              loadUniveristyClassesSuccess({
                classes: universityClasses.map((universityClass) =>
                  this.handleFormatingDateAndTime(universityClass)
                ),
              })
            ),
            catchError((errorResponse) => this.errorHandling(errorResponse))
          )
      )
    )
  );

  deleteProfessorClass$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProfessorClass),
      concatMap(({ classId, reservedSeatsIds }) =>
        this.seatService.deleteReservedSeats(reservedSeatsIds).pipe(
          concatMap(() => this.classService.deleteProfessorClass(classId)),
          map(() => deleteProfessorClassSuccess()),
          catchError((errorResponse) => this.errorHandling(errorResponse))
        )
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
          ),
          catchError((errorResponse) => this.errorHandling(errorResponse))
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

  reserveSeatInClass$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reserveSeatInClass),
      switchMap(({ seatForReservation }) =>
        this.seatService.createSeat(seatForReservation).pipe(
          map((reservedSeat) => reserveSeatInClassSuccess({ reservedSeat })),
          catchError((errorResponse) => this.errorHandling(errorResponse))
        )
      )
    )
  );

  reserveSeatInClassSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(reserveSeatInClassSuccess),
        tap(() => {
          this._snackBar.open('Seat reserved successfully!', 'Dismiss', {
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

  errorHandling(errorResponse: HttpErrorResponse) {
    return of(
      classFailure({
        error: {
          message: errorResponse.error.message,
          status: errorResponse.status,
        },
      })
    );
  }
}
