import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../../../state/auth/auth.selectors';
import { User } from '../../../../state/auth/models/user.model';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DashboardClassesComponent } from '../../components/dashboard-classes/dashboard-classes.component';
import { ProfessorInfoDetailsComponent } from '../../components/professor-info-details/professor-info-details.component';
import { DashboardSubmitButtonComponent } from '../../components/dashboard-submit-button/dashboard-submit-button.component';
import { DashboardTitleComponent } from '../../components/dashboard-title/dashboard-title.component';

@Component({
  selector: 'app-professor-dashboard-page',
  imports: [
    CommonModule,
    DashboardClassesComponent,
    ProfessorInfoDetailsComponent,
    DashboardSubmitButtonComponent,
    DashboardTitleComponent,
  ],
  templateUrl: './professor-dashboard-page.component.html',
  styleUrl: './professor-dashboard-page.component.scss',
})
export class ProfessorDashboardPageComponent {
  user: Observable<User | null> = of(null);
  constructor(private store: Store) {
    this.user = this.store.select(selectAuthUser);
  }
}
