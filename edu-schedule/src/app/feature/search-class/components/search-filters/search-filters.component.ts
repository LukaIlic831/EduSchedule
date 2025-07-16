import { Component, Input, OnInit } from '@angular/core';
import { YEARS } from '../../../../data/data';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Subject } from '../../../../state/education-data/models/subject.model';
import { selectEducationDataSubjects } from '../../../../state/education-data/education-data.selectors';
import { loadAllSubjectsByUniversityIdAndStudyProgramId } from '../../../../state/education-data/education-data.actions';
import {
  setSelectedSubject,
  setSelectedYear,
} from '../../../../state/class/class.actions';
import {
  selectSelectedSubjectId,
  selectSelectedYear,
} from '../../../../state/class/class.selectors';

@Component({
  selector: 'app-search-filters',
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.scss',
})
export class SearchFiltersComponent implements OnInit {
  years = YEARS;
  subjects: Observable<Subject[]> = of([]);
  selectedSubjectId: Observable<number | null> = of(null);
  selectedYear: Observable<number | null> = of(null);
  @Input() universityId!: number;
  @Input() studyProgramId!: number;

  constructor(private store: Store) {}

  ngOnInit() {
    this.subjects = this.store.select(selectEducationDataSubjects);
    this.selectedSubjectId = this.store.select(selectSelectedSubjectId);
    this.selectedYear = this.store.select(selectSelectedYear);
    this.store.dispatch(
      loadAllSubjectsByUniversityIdAndStudyProgramId({
        universityId: this.universityId,
        studyProgramId: this.studyProgramId,
      })
    );
  }

  handleOnYearSelect(selectedYear: number) {
    this.store.dispatch(setSelectedYear({ selectedYear }));
  }

  handleOnSubjectSelect(selectedSubjectId: number) {
    this.store.dispatch(setSelectedSubject({ selectedSubjectId }));
  }
}
