import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClassModel } from '../../../state/class/models/class.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectProfessorClassForDelete } from '../../../state/class/class.actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-class',
  imports: [CommonModule, RouterLink],
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss',
})
export class ClassComponent {
  @Input() loadedClass!: ClassModel;
  @Input() canBeDeleted? = false;
  @Output() handleClassDeleteClick = new EventEmitter<void>();

  constructor(private store: Store) {}

  handleDeleteClass(selectedClass: ClassModel) {
    this.store.dispatch(selectProfessorClassForDelete({ selectedClass }));
    this.handleClassDeleteClick.emit();
  }
}
