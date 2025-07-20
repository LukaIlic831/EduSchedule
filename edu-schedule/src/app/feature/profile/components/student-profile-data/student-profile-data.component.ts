import { Component, Input } from '@angular/core';
import { signOut } from '../../../../state/auth/auth.actions';
import { Store } from '@ngrx/store';
import { User } from '../../../../state/auth/models/user.model';

@Component({
  selector: 'app-student-profile-data',
  imports: [],
  templateUrl: './student-profile-data.component.html',
  styleUrl: './student-profile-data.component.scss',
})
export class StudentProfileDataComponent {
  @Input() currentUser!: User;
  constructor(private store: Store) {}
  handleSignOut() {
    this.store.dispatch(signOut());
  }
}
