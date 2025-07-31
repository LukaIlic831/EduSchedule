import { Component, Input } from '@angular/core';
import { ClassModel } from '../../../../../state/class/models/class.model';

@Component({
  selector: 'app-class-info-details',
  imports: [],
  templateUrl: './class-info-details.component.html',
  styleUrl: './class-info-details.component.scss'
})
export class ClassInfoDetailsComponent {
  @Input() selectedClass!: ClassModel;
}
