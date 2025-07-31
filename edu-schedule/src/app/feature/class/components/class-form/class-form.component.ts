import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { RouterLink } from '@angular/router';
import { filter, Observable, of, take } from 'rxjs';
import { StudyProgram } from '../../../../state/education-data/models/study-program.model';
import { Classroom } from '../../../../state/education-data/models/classrooms.model';
import { Subject } from '../../../../state/education-data/models/subject.model';
import { Store } from '@ngrx/store';
import { notZeroOrNullValidator } from '../../../../core/validators/not-zero-or-null.validator';
import {
  selectEducationDataClassrooms,
  selectEducationDataStudyPrograms,
  selectEducationDataSubjects,
} from '../../../../state/education-data/education-data.selectors';
import {
  selectAuthUserProfessorId,
  selectAuthUserUniversityId,
} from '../../../../state/auth/auth.selectors';
import { ClassModel } from '../../../../state/class/models/class.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  loadAllClassroomsByUniversityId,
  loadAllStudyProgramsByUniversityId,
  loadAllSubjectsByStudyProgramId,
} from '../../../../state/education-data/education-data.actions';
import {
  createClass,
  updateClass,
} from '../../../../state/class/class.actions';
import {
  addMinutes,
  combineDateAndTime,
  getDurationInMinutes,
} from '../../../../core/utils/date-time.utils';
import { startTimeNotInPastValidator } from '../../../../core/validators/start-time-not-in-past.validator';
import { SnackbarService } from '../../../../core/snackbar/service/snackbar.service';

@Component({
  selector: 'app-class-form',
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
  templateUrl: './class-form.component.html',
  styleUrl: './class-form.component.scss',
})
export class ClassFormComponent {
  classForm: FormGroup;
  studyPrograms: Observable<StudyProgram[]> = of([]);
  classrooms: Observable<Classroom[]> = of([]);
  subjects: Observable<Subject[]> = of([]);
  professorId: Observable<number | null> = of(0);
  universityId = 0;
  minDate = new Date();
  reservedSeatsIds: number[] = [];
  destroyRef = inject(DestroyRef);
  @Input() selectedClass?: ClassModel;
  @Input() classId?: number;
  @Input() formTitle!: string;
  @Input() mode!: string;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private snackbarService: SnackbarService
  ) {
    this.classForm = this.fb.group(
      {
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
      },
      { validators: [startTimeNotInPastValidator()] }
    );
  }

  ngOnInit() {
    this.studyPrograms = this.store.select(selectEducationDataStudyPrograms);
    this.classrooms = this.store.select(selectEducationDataClassrooms);
    this.subjects = this.store.select(selectEducationDataSubjects);
    this.professorId = this.store.select(selectAuthUserProfessorId);
    this.handleUniversityIdSelect();
    this.handleOnChangeStudyProgram();
    this.selectedClass && this.handleSelectedClass(this.selectedClass);
  }

  handleSelectedClass(selectedClass: ClassModel) {
    this.reservedSeatsIds = selectedClass.reservedSeats.map((seat) => seat.id);
    this.loadFormWithClassData(selectedClass);
  }

  loadFormWithClassData(selectedClass: ClassModel): void {
    const classDate = new Date(selectedClass.startTime);
    this.classForm.patchValue({
      title: selectedClass.lectureTitle,
      description: selectedClass.lectureDesc,
      studyProgram: selectedClass.subject.studyProgram.id,
      subject: selectedClass.subject.id,
      classroom: selectedClass.classroom.id,
      classDate: classDate,
      startTime: classDate,
      classDuration: getDurationInMinutes(
        selectedClass.startTime,
        selectedClass.endTime
      ),
    });
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
    this.classForm
      .get('studyProgram')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((selectedStudyProgramId: number) => {
        if (selectedStudyProgramId) {
          this.classForm.get('subject')?.enable();
          this.classForm.get('subject')?.reset();
          this.store.dispatch(
            loadAllSubjectsByStudyProgramId({
              studyProgramId: selectedStudyProgramId,
            })
          );
        } else {
          this.classForm.get('subject')?.disable();
        }
      });
  }

  onSubmit(professorId: number) {
    this.handleFormErrors();
    if (this.classForm.valid) {
      const {
        title,
        description,
        subject,
        classroom,
        classDate,
        startTime,
        classDuration,
      } = this.classForm.getRawValue();
      const combinedStartDateAndTime = combineDateAndTime(classDate, startTime);
      const combinedEndDateAndTime = addMinutes(
        combinedStartDateAndTime,
        classDuration
      );
      this.mode === 'create'
        ? this.handleOnSubmitCreateClass(
            classroom,
            description,
            title,
            professorId,
            combinedStartDateAndTime,
            combinedEndDateAndTime,
            subject
          )
        : this.handleOnSubmitUpdateClass(
            classroom,
            description,
            title,
            professorId,
            combinedStartDateAndTime,
            combinedEndDateAndTime,
            subject
          );
    }
  }

  handleOnSubmitUpdateClass(
    classroom: number,
    description: string,
    title: string,
    professorId: number,
    combinedStartDateAndTime: Date,
    combinedEndDateAndTime: Date,
    subject: number
  ) {
    this.store.dispatch(
      updateClass({
        classForUpdate: {
          classId: this.classId!,
          classroomId: classroom,
          lectureDesc: description,
          lectureTitle: title,
          professorId,
          startTime: combinedStartDateAndTime.toISOString(),
          subjectId: subject,
          universityId: this.universityId,
          endTime: combinedEndDateAndTime.toISOString(),
        },
        reservedSeatsIds: this.reservedSeatsIds,
      })
    );
  }

  handleOnSubmitCreateClass(
    classroom: number,
    description: string,
    title: string,
    professorId: number,
    combinedStartDateAndTime: Date,
    combinedEndDateAndTime: Date,
    subject: number
  ) {
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

  handleFormErrors() {
    this.classForm.errors?.['startTimeInPast'] &&
      this.snackbarService.showError("Class can't start in the past");
  }
}
