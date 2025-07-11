import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectAuthError,
  selectAuthTokenAndRole,
} from '../../../../state/auth/auth.selectors';
import { filter, take } from 'rxjs';
import { signUp } from '../../../../state/auth/auth.actions';

@Component({
  selector: 'app-sign-up-page',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
})
export class SignUpPageComponent {
  signUpForm: FormGroup;
  hidePassword = true;
  private _snackBar = inject(MatSnackBar);

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      const { username, email, password, role } = this.signUpForm.value;
      this.store.dispatch(signUp({ username, email, password, role }));
      this.listenSuccess();
      this.listenError();
    }
  }

  listenSuccess() {
    this.store
      .select(selectAuthTokenAndRole)
      .pipe(
        filter(({ token }) => !!token),
        take(1)
      )
      .subscribe(({ role, token }) => {
        this._snackBar.open('Signup successful!', 'Dismiss', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
        this.router.navigate([
          role === 'S' ? '/student-info' : '/professor-info',
        ]);
      });
  }

  listenError() {
    this.store
      .select(selectAuthError)
      .pipe(
        filter((error) => !!error && error.status !== 404),
        take(1)
      )
      .subscribe((error) => {
        this._snackBar.open(error!.message, 'Dismiss', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      });
  }

  togglePassword(event: MouseEvent) {
    this.hidePassword = !this.hidePassword;
    event.stopPropagation();
  }
}
