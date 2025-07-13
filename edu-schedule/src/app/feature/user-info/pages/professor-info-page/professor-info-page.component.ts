import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { selectAuthUserUsername } from '../../../../state/auth/auth.selectors';
import { Observable, of, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { loadUser } from '../../../../state/auth/auth.actions';
import { InfoTitleComponent } from '../../components/info-title/info-title.component';
import { loadAllUniversities } from '../../../../state/education-data/education-data.actions';
import { University } from '../../../../state/education-data/models/university.model';
import { selectEducationDataUniversities } from '../../../../state/education-data/education-data.selectors';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
  username: Observable<string> = of('');
  universities: Observable<University[]> = of([]);
  constructor(private store: Store, private fb: FormBuilder) {
    this.additionalDataForm = this.fb.group({
      university: new FormControl(0, [Validators.required]),
      title: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.store.dispatch(loadUser());
    this.store.dispatch(loadAllUniversities());
    this.username = this.store.select(selectAuthUserUsername);
    this.universities = this.store.select(selectEducationDataUniversities);
  }
}
