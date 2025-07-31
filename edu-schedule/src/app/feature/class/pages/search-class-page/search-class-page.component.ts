import { Component } from '@angular/core';
import { NavComponent } from '../../../../shared/components/nav/nav.component';
import { CommonModule } from '@angular/common';
import { YEARS } from '../../../../core/data/data';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  selectAuthUserStudentStudyProgramId,
  selectAuthUserUniversityId,
} from '../../../../state/auth/auth.selectors';
import { SearchInputComponent } from '../../components/search-class/search-input/search-input.component';
import { SearchClassesComponent } from '../../components/search-class/search-classes/search-classes.component';
import { SearchFiltersComponent } from '../../components/search-class/search-filters/search-filters.component';

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
