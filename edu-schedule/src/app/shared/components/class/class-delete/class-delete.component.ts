import { Component, Input } from '@angular/core';
import { ClassModel } from '../../../../state/class/models/class.model';

@Component({
  selector: 'app-class-delete',
  imports: [],
  templateUrl: './class-delete.component.html',
  styleUrl: './class-delete.component.scss',
})
export class ClassDeleteComponent {
  @Input() selectedClass!: ClassModel;
  @Input() onDeleteFn!: (selectedClass: ClassModel) => void;

  handleClick(event: MouseEvent) {
    event.stopPropagation();
    if (this.onDeleteFn && this.selectedClass) {
      this.onDeleteFn(this.selectedClass);
    }
  }
}
