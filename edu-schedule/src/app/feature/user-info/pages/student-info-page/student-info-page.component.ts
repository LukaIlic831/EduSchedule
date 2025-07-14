import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InfoTitleComponent } from '../../components/info-title/info-title.component';
import { filter, Observable, of, take } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  loadUser,
  updateUserAndCreateStudent,
} from '../../../../state/auth/auth.actions';
import {
  selectAuthUserUserId,
  selectAuthUserUsername,
} from '../../../../state/auth/auth.selectors';
import { University } from '../../../../state/education-data/models/university.model';
import {
  loadAllStudyProgramsByUniversityId,
  loadAllUniversities,
} from '../../../../state/education-data/education-data.actions';
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
  Validators,
} from '@angular/forms';
import { YEARS } from '../../../../data/data';
import { StudyProgram } from '../../../../state/education-data/models/study-program.model';
import { notZeroOrNullValidator } from '../../validators/not-zero-or-null.validator';

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
  username: Observable<string> = of('');
  universities: Observable<University[]> = of([]);
  studyPrograms: Observable<StudyProgram[]> = of([]);
  years = YEARS;
  userId = 0;

  constructor(private store: Store, private fb: FormBuilder) {
    this.additionalDataForm = this.fb.group({
      university: new FormControl(0, [notZeroOrNullValidator()]),
      year: new FormControl(0, [notZeroOrNullValidator()]),
      studyProgram: new FormControl({ value: 0, disabled: true }, [
        notZeroOrNullValidator(),
      ]),
      index: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.username = this.store.select(selectAuthUserUsername);
    this.universities = this.store.select(selectEducationDataUniversities);
    this.studyPrograms = this.store.select(selectEducationDataStudyPrograms);
    this.handleStudyPrograms();
    this.handleYear();
    this.store
      .select(selectAuthUserUserId)
      .pipe(
        filter((userId) => !!userId),
        take(1)
      )
      .subscribe((userId) => (this.userId = userId));
  }

  handleStudyPrograms() {
    this.additionalDataForm
      .get('university')
      ?.valueChanges.subscribe((selectedUniversityId: number) => {
        if (selectedUniversityId) {
          this.additionalDataForm.get('year')?.reset();
          this.additionalDataForm.get('studyProgram')?.enable();
          this.store.dispatch(
            loadAllStudyProgramsByUniversityId({
              universityId: selectedUniversityId,
            })
          );
        } else {
          this.additionalDataForm.get('studyProgram')?.disable();
        }
      });
  }

  handleYear() {
    this.additionalDataForm
      .get('year')
      ?.valueChanges.subscribe((selectedYear: number) => {
        if (selectedYear === 1) {
          this.additionalDataForm.get('studyProgram')?.disable();
          this.studyPrograms.subscribe((studyPrograms) => {
            const defaultProgram = studyPrograms.find(
              (program) => program.name === 'opsti'
            );
            defaultProgram &&
              this.additionalDataForm.patchValue({
                studyProgram: defaultProgram.id,
              });
          });
        } else {
          this.additionalDataForm.get('studyProgram')?.enable();
        }
      });
  }

  onSubmit() {
    if (this.additionalDataForm.valid) {
      const { university, year, studyProgram, index } =
        this.additionalDataForm.getRawValue();
      this.store.dispatch(
        updateUserAndCreateStudent({
          userId: this.userId,
          universityId: university,
          student: {
            index: index,
            year: year,
            studyProgram: studyProgram,
            userId: this.userId,
          },
        })
      );
    }
  }
}
