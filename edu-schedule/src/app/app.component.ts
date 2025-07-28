import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadingOverlayComponent } from './shared/components/loading-overlay/loading-overlay.component';
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
import { selectAuthLoading } from './state/auth/auth.selectors';
import { selectClassLoading } from './state/class/class.selectors';
import { selectEducationDataLoading } from './state/education-data/education-data.selectors';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { loadAllUniversities } from './state/education-data/education-data.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingOverlayComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  loading: Observable<boolean> = of(false);
  destroyRef = inject(DestroyRef);
  constructor(private store: Store) {}
  ngOnInit() {
    this.store.dispatch(loadAllUniversities());
    this.handleLoading();
  }

  handleLoading() {
    this.loading = combineLatest([
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
      }),

      takeUntilDestroyed(this.destroyRef)
    );
  }
}
