import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
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
import { selectAuthError } from '../../../../state/auth/auth.selectors';
import { filter } from 'rxjs';
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

  constructor(private store: Store, private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.store.dispatch(signIn({ email, password }));
      this.store
        .select(selectAuthError)
        .pipe(
          filter((error) => {
            if (!error) return false;
            const isBadRequest = error.status === 404;
            return !isBadRequest;
          })
        )
        .subscribe((error) => {
          this._snackBar.open(error?.message!, 'Dismiss', {
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
        });
    }
  }

  togglePassword(event: MouseEvent) {
    this.hidePassword = !this.hidePassword;
    event.stopPropagation();
  }
}
