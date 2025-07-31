import { Component, DestroyRef, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InfoTitleComponent } from '../../components/info-title/info-title.component';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { updateUserAndCreateStudent } from '../../../../state/auth/auth.actions';
import {
  selectAuthUserUserId,
  selectAuthUserUsername,
} from '../../../../state/auth/auth.selectors';
import { University } from '../../../../state/education-data/models/university.model';
import { loadAllStudyProgramsByUniversityIdAndSelectedYear } from '../../../../state/education-data/education-data.actions';
import {
  selectEducationDataStudyPrograms,
  selectEducationDataUniversities,
} from '../../../../state/education-data/education-data.selectors';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { YEARS } from '../../../../core/data/data';
import { StudyProgram } from '../../../../state/education-data/models/study-program.model';
import { notZeroOrNullValidator } from '../../../../core/validators/not-zero-or-null.validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-student-info-page',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    InfoTitleComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './student-info-page.component.html',
  styleUrl: './student-info-page.component.scss',
})
export class StudentInfoPageComponent {
  additionalDataForm: FormGroup;
  username: Observable<string | null> = of('');
  universities: Observable<University[]> = of([]);
  studyPrograms: Observable<StudyProgram[]> = of([]);
  filteredStudyPrograms: Observable<StudyProgram[]> = of([]);
  years = YEARS;
  userId: Observable<number | null> = of(0);
  destroyRef = inject(DestroyRef);
  constructor(private store: Store, private fb: FormBuilder) {
    this.additionalDataForm = this.fb.group({
      university: new FormControl(0, [notZeroOrNullValidator()]),
      year: new FormControl({ value: 0, disabled: true }, [
        notZeroOrNullValidator(),
      ]),
      studyProgram: new FormControl({ value: 0, disabled: true }, [
        notZeroOrNullValidator(),
      ]),
      index: new FormControl(0, [notZeroOrNullValidator()]),
    });
  }
  ngOnInit() {
    this.username = this.store.select(selectAuthUserUsername);
    this.universities = this.store.select(selectEducationDataUniversities);
    this.studyPrograms = this.store.select(selectEducationDataStudyPrograms);
    this.userId = this.store.select(selectAuthUserUserId);
    this.handleOnUniversityChange();
    this.handleOnYearChange();
  }

  handleOnUniversityChange() {
    this.additionalDataForm
      .get('university')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((selectedUniversityId: number) => {
        if (selectedUniversityId) {
          this.additionalDataForm.get('year')?.reset();
          this.additionalDataForm.get('year')?.enable();
          this.additionalDataForm.get('studyProgram')?.reset();
          this.additionalDataForm.get('studyProgram')?.disable();
        } else {
          this.additionalDataForm.get('year')?.disable();
          this.additionalDataForm.get('studyProgram')?.disable();
        }
      });
  }

  handleOnYearChange() {
    this.additionalDataForm
      .get('year')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((selectedYear: number) => {
        if (selectedYear) {
          const { university } = this.additionalDataForm.value;
          this.additionalDataForm.get('studyProgram')?.enable();
          this.store.dispatch(
            loadAllStudyProgramsByUniversityIdAndSelectedYear({
              universityId: university,
              selectedYear,
            })
          );
        }
      });
  }

  onSubmit(userId: number) {
    if (this.additionalDataForm.valid) {
      const { university, year, studyProgram, index } =
        this.additionalDataForm.getRawValue();
      this.store.dispatch(
        updateUserAndCreateStudent({
          userId,
          universityId: university,
          student: {
            index: index,
            year: year,
            studyProgramId: studyProgram,
          },
        })
      );
    }
  }
}
