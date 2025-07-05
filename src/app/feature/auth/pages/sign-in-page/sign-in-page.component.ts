import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-sign-in-page',
  imports: [ MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss'
})
export class SignInPageComponent {

}
