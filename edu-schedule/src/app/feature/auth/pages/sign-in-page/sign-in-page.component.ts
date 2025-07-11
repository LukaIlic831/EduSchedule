import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { signIn } from '../../../../state/auth/auth.actions';
import {
  selectAuthError,
  selectAuthTokenAndRole,
} from '../../../../state/auth/auth.selectors';
import { filter, take } from 'rxjs';
@Component({
  selector: 'app-sign-in-page',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
})
export class SignInPageComponent {
  signInForm: FormGroup;
  hidePassword = true;
  private _snackBar = inject(MatSnackBar);

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.store.dispatch(signIn({ email, password }));
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
      .subscribe(({ role }) => {
        this._snackBar.open('Login successful!', 'Dismiss', {
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
