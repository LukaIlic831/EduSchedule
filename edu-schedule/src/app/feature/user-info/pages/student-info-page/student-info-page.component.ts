import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-student-info-page',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatCardModule],
  templateUrl: './student-info-page.component.html',
  styleUrl: './student-info-page.component.scss'
})
export class StudentInfoPageComponent {

}
