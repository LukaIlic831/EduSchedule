import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InfoTitleComponent } from '../../components/info-title/info-title.component';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadUser } from '../../../../state/auth/auth.actions';
import { selectAuthUserUsername } from '../../../../state/auth/auth.selectors';

@Component({
  selector: 'app-student-info-page',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    InfoTitleComponent,
  ],
  templateUrl: './student-info-page.component.html',
  styleUrl: './student-info-page.component.scss',
})
export class StudentInfoPageComponent {
  username: Observable<string> = of('');
  constructor(private store: Store) {}
  ngOnInit() {
    this.store.dispatch(loadUser());
    this.username = this.store.select(selectAuthUserUsername);
  }
}
