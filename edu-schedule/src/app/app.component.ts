import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { loadAllUniversities } from './state/education-data/education-data.actions';
import { LoadingComponent } from './core/loading-overlay/components/loading/loading.component';
import { LoadingService } from './core/loading-overlay/service/loading.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  loading: Observable<boolean> = of(false);
  destroyRef = inject(DestroyRef);

  constructor(private loadingService: LoadingService, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadAllUniversities());
    this.loading = this.loadingService
      .getGlobalLoading()
      .pipe(takeUntilDestroyed(this.destroyRef));
  }
}
