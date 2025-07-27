import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, of, switchMap, take } from 'rxjs';
import {
  selectAuthLoading,
  selectAuthUser,
} from '../../state/auth/auth.selectors';
import { loadUser } from '../../state/auth/auth.actions';

export const authGuard: CanActivateFn = (
  route,
  state
): Observable<boolean | UrlTree> => {
  const store = inject(Store);
  const router = inject(Router);

  store.dispatch(loadUser());

  return store.select(selectAuthLoading).pipe(
    filter((loading) => !loading),
    take(1),
    switchMap(() =>
      store.select(selectAuthUser).pipe(
        take(1),
        switchMap((user) => {
          if (!user) {
            return of(false);
          }
          const routePath = route.routeConfig?.path;
          if (!user.professor && !user.student) {
            if (user.role === 'S' && routePath !== 'student-info') {
              return of(router.createUrlTree(['/student-info']));
            }
            if (user.role === 'P' && routePath !== 'professor-info') {
              return of(router.createUrlTree(['/professor-info']));
            }
          }
          return of(true);
        })
      )
    )
  );
};
