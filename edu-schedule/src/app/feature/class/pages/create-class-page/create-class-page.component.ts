import { Component } from '@angular/core';
import { ClassFormComponent } from '../../components/class-form/class-form.component';
@Component({
  selector: 'app-create-class-page',
  imports: [ClassFormComponent],
  templateUrl: './create-class-page.component.html',
  styleUrl: './create-class-page.component.scss',
})
export class CreateClassPageComponent {
  formTitle = 'Create Class';
}
