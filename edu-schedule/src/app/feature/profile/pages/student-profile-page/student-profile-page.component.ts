import { Component } from '@angular/core';
import { NavComponent } from '../../../../shared/components/nav/nav.component';
import { ClassComponent } from '../../../../shared/components/class/class.component';
import { Store } from '@ngrx/store';
import { signOut } from '../../../../state/auth/auth.actions';

@Component({
  selector: 'app-student-profile-page',
  imports: [NavComponent, ClassComponent],
  templateUrl: './student-profile-page.component.html',
  styleUrl: './student-profile-page.component.scss',
})
export class StudentProfilePageComponent {
  constructor(private store: Store) {}
  handleSignOut() {
    this.store.dispatch(signOut());
  }
}
