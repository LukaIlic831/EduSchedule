import { Component, Input } from '@angular/core';
import { User } from '../../../../state/auth/models/user.model';
import { Store } from '@ngrx/store';
import { signOut } from '../../../../state/auth/auth.actions';

@Component({
  selector: 'app-professor-info-details',
  imports: [],
  templateUrl: './professor-info-details.component.html',
  styleUrl: './professor-info-details.component.scss',
})
export class ProfessorInfoDetailsComponent {
  @Input() currentUser!: User;

  constructor(private store: Store) {}
  handleSignOut() {
    this.store.dispatch(signOut());
  }
}
