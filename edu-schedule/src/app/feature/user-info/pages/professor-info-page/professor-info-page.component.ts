import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import {
  selectAuthUserUserId,
  selectAuthUserUsername,
} from '../../../../state/auth/auth.selectors';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { updateUserAndCreateProfessor } from '../../../../state/auth/auth.actions';
import { InfoTitleComponent } from '../../components/info-title/info-title.component';
import { University } from '../../../../state/education-data/models/university.model';
import { selectEducationDataUniversities } from '../../../../state/education-data/education-data.selectors';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { notZeroOrNullValidator } from '../../../../validators/not-zero-or-null.validator';

@Component({
  selector: 'app-professor-info-page',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    InfoTitleComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './professor-info-page.component.html',
  styleUrl: './professor-info-page.component.scss',
})
export class ProfessorInfoPageComponent implements OnInit {
  additionalDataForm: FormGroup;
  username: Observable<string | null> = of('');
  universities: Observable<University[]> = of([]);
  userId: Observable<number | null> = of(0);
  constructor(private store: Store, private fb: FormBuilder) {
    this.additionalDataForm = this.fb.group({
      university: new FormControl(0, [notZeroOrNullValidator()]),
      title: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.username = this.store.select(selectAuthUserUsername);
    this.universities = this.store.select(selectEducationDataUniversities);
    this.userId = this.store.select(selectAuthUserUserId);
  }

  onSubmit(userId: number) {
    if (this.additionalDataForm.valid) {
      const { university, title } = this.additionalDataForm.value;
      this.store.dispatch(
        updateUserAndCreateProfessor({
          userId,
          universityId: university,
          professor: { title: title },
        })
      );
    }
  }
}
