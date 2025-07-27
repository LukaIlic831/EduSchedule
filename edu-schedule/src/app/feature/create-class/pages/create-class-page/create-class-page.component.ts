import { Component, DestroyRef, inject, OnInit } from '@angular/core';
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
import {
  selectAuthUserProfessorId,
  selectAuthUserUniversityId,
} from '../../../../state/auth/auth.selectors';
import { Classroom } from '../../../../state/education-data/models/classrooms.model';
import {
  selectEducationDataClassrooms,
  selectEducationDataStudyPrograms,
  selectEducationDataSubjects,
} from '../../../../state/education-data/education-data.selectors';
import { CommonModule } from '@angular/common';
import { Subject } from '../../../../state/education-data/models/subject.model';
import { createClass } from '../../../../state/class/class.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  professorId: Observable<number | null> = of(0);
  universityId = 0;
  minDate = new Date();
  private destroyRef = inject(DestroyRef);

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
      classDuration: new FormControl(45, [notZeroOrNullValidator()]),
    });
  }

  ngOnInit() {
    this.studyPrograms = this.store.select(selectEducationDataStudyPrograms);
    this.classrooms = this.store.select(selectEducationDataClassrooms);
    this.subjects = this.store.select(selectEducationDataSubjects);
    this.professorId = this.store.select(selectAuthUserProfessorId);
    this.handleUniversityIdSelect();
    this.handleOnChangeStudyProgram();
  }

  handleUniversityIdSelect() {
    this.store
      .select(selectAuthUserUniversityId)
      .pipe(
        filter((universityId) => !!universityId),
        take(1)
      )
      .subscribe((universityId) => {
        this.universityId = universityId!;
        this.store.dispatch(
          loadAllStudyProgramsByUniversityId({
            universityId: this.universityId,
          })
        );
        this.store.dispatch(
          loadAllClassroomsByUniversityId({ universityId: this.universityId })
        );
      });
  }

  handleOnChangeStudyProgram() {
    this.createClassDataForm
      .get('studyProgram')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((selectedStudyProgramId: number) => {
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

  onSubmit(professorId: number) {
    if (this.createClassDataForm.valid) {
      const {
        title,
        description,
        subject,
        classroom,
        classDate,
        startTime,
        classDuration,
      } = this.createClassDataForm.getRawValue();
      const combinedStartDateAndTime = this.combineDateAndTime(
        classDate,
        startTime
      );
      const combinedEndDateAndTime = this.addMinutes(
        combinedStartDateAndTime,
        classDuration
      );
      this.store.dispatch(
        createClass({
          classForCreate: {
            classroomId: classroom,
            lectureDesc: description,
            lectureTitle: title,
            professorId,
            startTime: combinedStartDateAndTime.toISOString(),
            subjectId: subject,
            universityId: this.universityId,
            endTime: combinedEndDateAndTime.toISOString(),
          },
        })
      );
    }
  }

  combineDateAndTime(date: Date, time: Date): Date {
    const combinedDate = new Date(date);
    combinedDate.setHours(time.getHours(), time.getMinutes(), 0, 0);
    return combinedDate;
  }

  addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }
}
