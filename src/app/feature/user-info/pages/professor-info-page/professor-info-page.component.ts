import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-professor-info-page',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatCardModule],
  templateUrl: './professor-info-page.component.html',
  styleUrl: './professor-info-page.component.scss'
})
export class ProfessorInfoPageComponent {

}
