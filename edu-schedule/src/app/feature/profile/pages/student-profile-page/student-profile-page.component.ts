import { Component } from '@angular/core';
import { NavComponent } from '../../../../shared/components/nav/nav.component';
import { StudentProfileDataComponent } from '../../components/student-profile-data/student-profile-data.component';
import { StudentProfileClassesComponent } from '../../components/student-profile-classes/student-profile-classes.component';
import { Observable, of } from 'rxjs';
import { User } from '../../../../state/auth/models/user.model';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../../../state/auth/auth.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-profile-page',
  imports: [
    NavComponent,
    StudentProfileDataComponent,
    StudentProfileClassesComponent,
    CommonModule,
  ],
  templateUrl: './student-profile-page.component.html',
  styleUrl: './student-profile-page.component.scss',
})
export class StudentProfilePageComponent {
  user: Observable<User | null> = of(null);
  constructor(private store: Store) {
    this.user = this.store.select(selectAuthUser);
  }
}
