import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  cancelReservedSeat,
  cancelReservedSeatSuccess,
  classFailure,
  createClass,
  createClassSuccess,
  deleteProfessorClass,
  deleteProfessorClassSuccess,
  loadClassByClassId,
  loadClassByClassIdSuccess,
  LoadClassesWithStudentReservedSeat,
  LoadClassesWithStudentReservedSeatSuccess,
  loadProfessorClasses,
  loadProfessorClassesSuccess,
  loadUniveristyClasses,
  loadUniveristyClassesSuccess,
  reserveSeatInClass,
  reserveSeatInClassSuccess,
  updateClass,
  updateClassSuccess,
} from './class.actions';
import { ClassService } from '../../core/class/service/class.service';
import { Router } from '@angular/router';
import { ClassModel } from './models/class.model';
import { SeatService } from '../../core/seat/service/seat.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../../core/snackbar/service/snackbar.service';

@Injectable()
export class ClassEffects {
  constructor(
    private actions$: Actions,
    private classService: ClassService,
    private seatService: SeatService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  createClass$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createClass),
      switchMap(({ classForCreate }) =>
        this.classService.createClass({ classForCreate }).pipe(
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
          this.snackbarService.showSuccess('Class created successfully!');
          this.router.navigate(['/professor-dashboard']);
        })
      ),
    { dispatch: false }
  );

  classUpdateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateClassSuccess),
        tap(() => {
          this.snackbarService.showSuccess('Class updated successfully!');
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
          this.snackbarService.showError(error!.message);
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

  LoadClassesWithStudentReservedSeat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadClassesWithStudentReservedSeat),
      switchMap(({ userId, index }) =>
        this.classService
          .getAllClassesWithStudentReservedSeat(userId, index)
          .pipe(
            map((studentClasses) =>
              LoadClassesWithStudentReservedSeatSuccess({
                classes: studentClasses.map((studentClass) =>
                  this.handleFormatingDateAndTime(studentClass)
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

  updateClass$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateClass),
      switchMap(({ classForUpdate, reservedSeatsIds }) =>
        this.classService
          .updateClass({ classForUpdate, reservedSeatsIds })
          .pipe(
            map((updatedClass) => updateClassSuccess({ updatedClass })),
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
          this.snackbarService.showSuccess('Class deleted successfully!');
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
          this.snackbarService.showSuccess('Seat reserved successfully!');
        })
      ),
    { dispatch: false }
  );

  cancelReservedSeat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cancelReservedSeat),
      switchMap(({ seatId, classId }) =>
        this.seatService.cancelReservedSeat(seatId, classId).pipe(
          map((canceledSeatId) =>
            cancelReservedSeatSuccess({ canceledSeatId })
          ),
          catchError((errorResponse) => this.errorHandling(errorResponse))
        )
      )
    )
  );

  cancelReservedSeatSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cancelReservedSeatSuccess),
        tap(() => {
          this.snackbarService.showSuccess(
            'Reserved seat canceled successfully!'
          );
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
