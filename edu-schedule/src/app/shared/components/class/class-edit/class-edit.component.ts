import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClassModel } from '../../../../state/class/models/class.model';

@Component({
  selector: 'app-class-edit',
  imports: [MatIconModule],
  templateUrl: './class-edit.component.html',
  styleUrl: './class-edit.component.scss',
})
export class ClassEditComponent {
  @Input() selectedClass!: ClassModel;
  @Input() onEditFn!: (selectedClassId: number) => void;

  handleClick(event: MouseEvent) {
    event.stopPropagation();
    if (this.onEditFn && this.selectedClass) {
      this.onEditFn(this.selectedClass.id);
    }
  }
}
