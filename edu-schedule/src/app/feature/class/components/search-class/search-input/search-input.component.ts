import { Component, DestroyRef, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { setSearchQuery } from '../../../../../state/class/class.actions';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Observable, of, take } from 'rxjs';
import { selectSearchQuery } from '../../../../../state/class/class.selectors';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-input',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  searchQueryValue: Observable<string> = of('');
  searchInputControl = new FormControl();
  destroyRef = inject(DestroyRef);
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.searchQueryValue = this.store.select(selectSearchQuery);
    this.searchQueryValue.pipe(take(1)).subscribe((searchQuery) => {
      this.searchInputControl.setValue(searchQuery);
    });
    this.handleSearchInputValueChange();
  }

  handleSearchInputValueChange() {
    this.searchInputControl.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((searchQuery) => {
        this.store.dispatch(setSearchQuery({ searchQuery }));
      });
  }
}
