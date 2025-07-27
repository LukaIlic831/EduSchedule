import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectAuthLoading,
  selectAuthUserProfessor,
  selectAuthUserStudent,
} from '../../state/auth/auth.selectors';
import { combineLatest, filter, Observable, of, switchMap, take } from 'rxjs';

export const infoGuard: CanActivateFn = (
  route,
  state
): Observable<boolean | UrlTree> => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(selectAuthLoading).pipe(
    filter((loading) => !loading),
    take(1),
    switchMap(() =>
      combineLatest([
        store.select(selectAuthUserProfessor),
        store.select(selectAuthUserStudent),
      ]).pipe(
        take(1),
        switchMap(([professor, student]) => {
          if (professor) {
            return of(router.createUrlTree(['/professor-dashboard']));
          }
          if (student) {
            return of(router.createUrlTree(['/search']));
          }
          return of(true);
        })
      )
    )
  );
};
