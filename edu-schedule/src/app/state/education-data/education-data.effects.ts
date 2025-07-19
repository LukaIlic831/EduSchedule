import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  educationDataFailure,
  loadAllClassroomsByUniversityId,
  loadAllClassroomsByUniversityIdSuccess,
  loadAllStudyProgramsByUniversityId,
  loadAllStudyProgramsByUniversityIdAndSelectedYear,
  loadAllStudyProgramsByUniversityIdAndSelectedYearSuccess,
  loadAllStudyProgramsByUniversityIdSuccess,
  loadAllSubjectsByStudyProgramId,
  loadAllSubjectsByStudyProgramIdSuccess,
  loadAllSubjectsByUniversityIdAndStudyProgramId,
  loadAllSubjectsByUniversityIdAndStudyProgramIdSuccess,
  loadAllUniversities,
  loadAllUniversitiesSuccess,
} from './education-data.actions';
import { EducationDataServiceService } from '../../core/education-data/service/education-data-service.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class EducationDataEffects {
  constructor(
    private actions$: Actions,
    private educationDataService: EducationDataServiceService
  ) {}
  private _snackBar = inject(MatSnackBar);
  loadAllUniversities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllUniversities),
      switchMap(() =>
        this.educationDataService.getAllUniversities().pipe(
          map((universities) => loadAllUniversitiesSuccess({ universities })),
          catchError((errorResponse: HttpErrorResponse) =>
            this.errorHandling(errorResponse)
          )
        )
      )
    )
  );

  loadAllStudyPrograms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllStudyProgramsByUniversityId),
      switchMap(({ universityId }) =>
        this.educationDataService
          .getAllStudyProgramsByUniversityId(universityId)
          .pipe(
            map((studyPrograms) =>
              loadAllStudyProgramsByUniversityIdSuccess({ studyPrograms })
            ),
            catchError((errorResponse: HttpErrorResponse) =>
              this.errorHandling(errorResponse)
            )
          )
      )
    )
  );

  loadAllStudyProgramsWithSelectedYear$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllStudyProgramsByUniversityIdAndSelectedYear),
      switchMap(({ universityId, selectedYear }) =>
        this.educationDataService
          .getAllStudyProgramsByUniversityIdAndSelectedYear(
            universityId,
            selectedYear
          )
          .pipe(
            map((studyPrograms) =>
              loadAllStudyProgramsByUniversityIdAndSelectedYearSuccess({
                studyPrograms,
              })
            ),
            catchError((errorResponse: HttpErrorResponse) =>
              this.errorHandling(errorResponse)
            )
          )
      )
    )
  );

  loadAllSubjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllSubjectsByStudyProgramId),
      switchMap(({ studyProgramId }) =>
        this.educationDataService
          .getAllSubjectsByStudyProgramId(studyProgramId)
          .pipe(
            map((subjects) =>
              loadAllSubjectsByStudyProgramIdSuccess({ subjects })
            ),
            catchError((errorResponse: HttpErrorResponse) =>
              this.errorHandling(errorResponse)
            )
          )
      )
    )
  );

  loadAllSubjectsByUniversityIdAndStudyProgramId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllSubjectsByUniversityIdAndStudyProgramId),
      switchMap(({ universityId, studyProgramId }) =>
        this.educationDataService
          .getAllSubjectsByUniversityIdAndStudyProgramId(
            universityId,
            studyProgramId
          )
          .pipe(
            map((subjects) =>
              loadAllSubjectsByUniversityIdAndStudyProgramIdSuccess({
                subjects,
              })
            ),
            catchError((errorResponse: HttpErrorResponse) =>
              this.errorHandling(errorResponse)
            )
          )
      )
    )
  );

  loadAllClassrooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllClassroomsByUniversityId),
      switchMap(({ universityId }) =>
        this.educationDataService
          .getAllClassroomsByUniversityId(universityId)
          .pipe(
            map((classrooms) =>
              loadAllClassroomsByUniversityIdSuccess({ classrooms })
            )
          )
      )
    )
  );

  educationDataFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(educationDataFailure),
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

  errorHandling(errorResponse: HttpErrorResponse) {
    return of(
      educationDataFailure({
        error: {
          message: errorResponse.error.message,
          status: errorResponse.status,
        },
      })
    );
  }
}
