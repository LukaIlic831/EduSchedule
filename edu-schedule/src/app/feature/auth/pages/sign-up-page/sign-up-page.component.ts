import { Component } from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
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

  constructor(
    private store: Store,
    private fb: FormBuilder,
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
      const { username, email, password, role } = this.signUpForm.value;
      this.store.dispatch(signUp({ username, email, password, role }));
    }
  }

  togglePassword(event: MouseEvent) {
    this.hidePassword = !this.hidePassword;
    event.stopPropagation();
  }
}
