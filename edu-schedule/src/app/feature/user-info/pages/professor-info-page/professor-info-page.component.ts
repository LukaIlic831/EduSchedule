import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { selectAuthUserUsername } from '../../../../state/auth/auth.selectors';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { loadUser } from '../../../../state/auth/auth.actions';
import { InfoTitleComponent } from '../../components/info-title/info-title.component';

@Component({
  selector: 'app-professor-info-page',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    InfoTitleComponent
  ],
  templateUrl: './professor-info-page.component.html',
  styleUrl: './professor-info-page.component.scss',
})
export class ProfessorInfoPageComponent implements OnInit {
  username: Observable<string> = of('');
  constructor(private store: Store) {}
  ngOnInit() {
    this.store.dispatch(loadUser());
    this.username = this.store.select(selectAuthUserUsername);
  }
}
