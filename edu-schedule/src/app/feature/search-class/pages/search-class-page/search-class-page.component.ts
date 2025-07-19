import { Component } from '@angular/core';
import { NavComponent } from '../../../../shared/components/nav/nav.component';
import { CommonModule } from '@angular/common';
import { YEARS } from '../../../../data/data';
import { SearchClassesComponent } from '../../components/search-classes/search-classes.component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  selectAuthUserStudentStudyProgramId,
  selectAuthUserUniversityId,
} from '../../../../state/auth/auth.selectors';
import { SearchFiltersComponent } from '../../components/search-filters/search-filters.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';

@Component({
  selector: 'app-search-class-page',
  imports: [
    SearchInputComponent,
    NavComponent,
    CommonModule,
    SearchClassesComponent,
    SearchFiltersComponent,
  ],
  templateUrl: './search-class-page.component.html',
  styleUrl: './search-class-page.component.scss',
})
export class SearchClassPageComponent {
  years = YEARS;
  universityId: Observable<number | null> = of(0);
  studyProgramId: Observable<number | null> = of(0);
  constructor(private store: Store) {
    this.universityId = this.store.select(selectAuthUserUniversityId);
    this.studyProgramId = this.store.select(
      selectAuthUserStudentStudyProgramId
    );
  }
}
