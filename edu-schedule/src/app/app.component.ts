import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUser } from './state/auth/auth.actions';
import { loadAllUniversities } from './state/education-data/education-data.actions';
import { selectAuthToken } from './state/auth/auth.selectors';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(loadUser());
    this.store.dispatch(loadAllUniversities());
  }
}
