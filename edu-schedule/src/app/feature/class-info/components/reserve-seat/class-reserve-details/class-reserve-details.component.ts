import { Component, Input } from '@angular/core';
import { ClassModel } from '../../../../../state/class/models/class.model';

@Component({
  selector: 'app-class-reserve-details',
  imports: [],
  templateUrl: './class-reserve-details.component.html',
  styleUrl: './class-reserve-details.component.scss',
})
export class ClassReserveDetailsComponent {
  @Input() isProfessor!: boolean;
  @Input() selectedClass!: ClassModel;
}
