import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { signOut } from '../../../../state/auth/auth.actions';
import { selectAuthUser } from '../../../../state/auth/auth.selectors';
import { User } from '../../../../state/auth/models/user.model';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DashboardClassesComponent } from '../../components/dashboard-classes/dashboard-classes.component';

@Component({
  selector: 'app-professor-dashboard-page',
  imports: [RouterLink, CommonModule, DashboardClassesComponent],
  templateUrl: './professor-dashboard-page.component.html',
  styleUrl: './professor-dashboard-page.component.scss',
})
export class ProfessorDashboardPageComponent {
  user: Observable<User | null> = of(null);
  constructor(private store: Store) {
    this.user = this.store.select(selectAuthUser);
  }
  handleSignOut() {
    this.store.dispatch(signOut());
  }
}
