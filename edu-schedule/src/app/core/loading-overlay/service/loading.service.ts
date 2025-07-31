import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  delayWhen,
  distinctUntilChanged,
  map,
  Observable,
  of,
  switchMap,
  timer,
} from 'rxjs';
import { selectAuthLoading } from '../../../state/auth/auth.selectors';
import { selectClassLoading } from '../../../state/class/class.selectors';
import { selectEducationDataLoading } from '../../../state/education-data/education-data.selectors';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private store: Store) {}

  getGlobalLoading(): Observable<boolean> {
    return combineLatest([
      this.store.select(selectAuthLoading),
      this.store.select(selectClassLoading),
      this.store.select(selectEducationDataLoading),
    ]).pipe(
      map(([auth, classL, edu]) => auth || classL || edu),
      distinctUntilChanged(),
      switchMap((isLoading) => {
        if (isLoading) {
          return of(true);
        }
        return of(false).pipe(delayWhen(() => timer(300)));
      })
    );
  }
}
