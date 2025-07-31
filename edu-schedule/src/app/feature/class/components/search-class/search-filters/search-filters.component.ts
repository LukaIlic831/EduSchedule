import { Component, Input, OnInit } from '@angular/core';
import { YEARS } from '../../../../../core/data/data';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Subject } from '../../../../../state/education-data/models/subject.model';
import {
  selectEducationDataClassrooms,
  selectEducationDataSubjects,
} from '../../../../../state/education-data/education-data.selectors';
import {
  loadAllClassroomsByUniversityId,
  loadAllSubjectsByUniversityIdAndStudyProgramId,
} from '../../../../../state/education-data/education-data.actions';
import {
  setSelectedClassroom,
  setSelectedSubject,
  setSelectedYear,
} from '../../../../../state/class/class.actions';
import {
  selectSelectedClassroomId,
  selectSelectedSubjectId,
  selectSelectedYear,
} from '../../../../../state/class/class.selectors';
import { Classroom } from '../../../../../state/education-data/models/classrooms.model';

@Component({
  selector: 'app-search-filters',
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.scss',
})
export class SearchFiltersComponent implements OnInit {
  years = YEARS;
  subjects: Observable<Subject[]> = of([]);
  classrooms: Observable<Classroom[]> = of([]);
  selectedSubjectId: Observable<number | null> = of(0);
  selectedClassroomId: Observable<number | null> = of(0);
  selectedYear: Observable<number | null> = of(0);
  @Input() universityId!: number;
  @Input() studyProgramId!: number;

  constructor(private store: Store) {}

  ngOnInit() {
    this.subjects = this.store.select(selectEducationDataSubjects);
    this.classrooms = this.store.select(selectEducationDataClassrooms);
    this.selectedSubjectId = this.store.select(selectSelectedSubjectId);
    this.selectedYear = this.store.select(selectSelectedYear);
    this.selectedClassroomId = this.store.select(selectSelectedClassroomId);
    this.store.dispatch(
      loadAllSubjectsByUniversityIdAndStudyProgramId({
        universityId: this.universityId,
        studyProgramId: this.studyProgramId,
      })
    );
    this.store.dispatch(
      loadAllClassroomsByUniversityId({ universityId: this.universityId })
    );
  }

  handleOnYearSelect(selectedYear: number) {
    this.store.dispatch(setSelectedYear({ selectedYear }));
  }

  handleOnSubjectSelect(selectedSubjectId: number) {
    this.store.dispatch(setSelectedSubject({ selectedSubjectId }));
  }

  handleOnClassroomSelect(selectedClassroomId: number) {
    this.store.dispatch(setSelectedClassroom({ selectedClassroomId }));
  }
}
