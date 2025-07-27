import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../core/auth/service/auth.service';
import { catchError, Observable, of, switchMap, take } from 'rxjs';

export const authPageGuard: CanActivateFn = (
  route,
  state
): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(
    take(1),
    switchMap((response) => {
      if (!response) {
        return of(false);
      }
      return of(
        router.createUrlTree([
          response.user.role === 'P' ? '/professor-dashboard' : '/search',
        ])
      );
    }),
    catchError(() => of(true))
  );
};
