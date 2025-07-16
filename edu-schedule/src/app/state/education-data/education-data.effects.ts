import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadAllClassroomsByUniversityId,
  loadAllClassroomsByUniversityIdSuccess,
  loadAllStudyProgramsByUniversityId,
  loadAllStudyProgramsByUniversityIdSuccess,
  loadAllSubjectsByStudyProgramId,
  loadAllSubjectsByStudyProgramIdSuccess,
  loadAllSubjectsByUniversityIdAndStudyProgramId,
  loadAllSubjectsByUniversityIdAndStudyProgramIdSuccess,
  loadAllUniversities,
  loadAllUniversitiesSuccess,
} from './education-data.actions';
import { EducationDataServiceService } from '../../core/education-data/services/education-data-service.service';
import { map, switchMap } from 'rxjs';

@Injectable()
export class EducationDataEffects {
  constructor(
    private actions$: Actions,
    private educationDataService: EducationDataServiceService
  ) {}

  loadAllUniversities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllUniversities),
      switchMap(() =>
        this.educationDataService
          .getAllUniversities()
          .pipe(
            map((universities) => loadAllUniversitiesSuccess({ universities }))
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
          .getAllSubjectsByUniversityIdAndStudyProgramId(universityId, studyProgramId)
          .pipe(
            map((subjects) =>
              loadAllSubjectsByUniversityIdAndStudyProgramIdSuccess({ subjects })
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
}
