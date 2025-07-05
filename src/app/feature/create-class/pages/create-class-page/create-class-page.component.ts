import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-class-page',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatCardModule, MatTimepickerModule,
    MatDatepickerModule, RouterLink],
  templateUrl: './create-class-page.component.html',
  styleUrl: './create-class-page.component.scss'
})
export class CreateClassPageComponent {

}
