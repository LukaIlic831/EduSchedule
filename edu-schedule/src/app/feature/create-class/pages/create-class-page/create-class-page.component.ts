import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { notZeroOrNullValidator } from '../../../../validators/not-zero-or-null.validator';
import { filter, Observable, of, take } from 'rxjs';
import { StudyProgram } from '../../../../state/education-data/models/study-program.model';
import {
  loadAllClassroomsByUniversityId,
  loadAllStudyProgramsByUniversityId,
  loadAllSubjectsByStudyProgramId,
} from '../../../../state/education-data/education-data.actions';
import { selectAuthUserUniversityId } from '../../../../state/auth/auth.selectors';
import { Classroom } from '../../../../state/education-data/models/classrooms.model';
import {
  selectEducationDataClassrooms,
  selectEducationDataStudyPrograms,
  selectEducationDataSubjects,
} from '../../../../state/education-data/education-data.selectors';
import { CommonModule } from '@angular/common';
import { Subject } from '../../../../state/education-data/models/subject.model';

@Component({
  selector: 'app-create-class-page',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatTimepickerModule,
    MatDatepickerModule,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './create-class-page.component.html',
  styleUrl: './create-class-page.component.scss',
})
export class CreateClassPageComponent implements OnInit {
  createClassDataForm: FormGroup;
  studyPrograms: Observable<StudyProgram[]> = of([]);
  classrooms: Observable<Classroom[]> = of([]);
  subjects: Observable<Subject[]> = of([]);

  constructor(private store: Store, private fb: FormBuilder) {
    this.createClassDataForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      studyProgram: new FormControl(0, [notZeroOrNullValidator()]),
      subject: new FormControl({ value: 0, disabled: true }, [
        notZeroOrNullValidator(),
      ]),
      classroom: new FormControl(0, [notZeroOrNullValidator()]),
      classDate: new FormControl(null, [Validators.required]),
      startTime: new FormControl(null, [Validators.required]),
    });
  }
  ngOnInit() {
    this.studyPrograms = this.store.select(selectEducationDataStudyPrograms);
    this.classrooms = this.store.select(selectEducationDataClassrooms);
    this.subjects = this.store.select(selectEducationDataSubjects);
    this.handleUniversityIdSelect();
    this.handleSubjects();
  }

  handleUniversityIdSelect() {
    this.store
      .select(selectAuthUserUniversityId)
      .pipe(
        filter((universityId) => !!universityId),
        take(1)
      )
      .subscribe((universityId) => {
        this.store.dispatch(
          loadAllStudyProgramsByUniversityId({
            universityId: universityId,
          })
        );
        this.store.dispatch(
          loadAllClassroomsByUniversityId({ universityId: universityId })
        );
      });
  }

  handleSubjects() {
    this.createClassDataForm
      .get('studyProgram')
      ?.valueChanges.subscribe((selectedStudyProgramId: number) => {
        if (selectedStudyProgramId) {
          this.createClassDataForm.get('subject')?.enable();
          this.createClassDataForm.get('subject')?.reset();
          this.store.dispatch(
            loadAllSubjectsByStudyProgramId({
              studyProgramId: selectedStudyProgramId,
            })
          );
        } else {
          this.createClassDataForm.get('subject')?.disable();
        }
      });
  }

  onSubmit() {
  }
}
