import { Component, Input } from '@angular/core';
import { ClassModel } from '../../../state/class/models/class.model';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-class',
  imports: [CommonModule],
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss',
})
export class ClassComponent {
  @Input() loadedClass!: ClassModel;
}
