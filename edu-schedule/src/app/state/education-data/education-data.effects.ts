import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadAllStudyProgramsByUniversityId,
  loadAllStudyProgramsByUniversityIdSuccess,
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
      switchMap(({universityId}) =>
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
}
