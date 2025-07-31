import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClassModel } from '../../../state/class/models/class.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectProfessorClassForDelete,
  selectProfessorClassForEdit,
} from '../../../state/class/class.actions';
import { Router, RouterLink } from '@angular/router';
import { ClassDeleteComponent } from './class-delete/class-delete.component';
import { ClassEditComponent } from './class-edit/class-edit.component';

@Component({
  selector: 'app-class',
  imports: [CommonModule, RouterLink, ClassDeleteComponent, ClassEditComponent],
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss',
})
export class ClassComponent {
  @Input() loadedClass!: ClassModel;
  @Input() canBeModified? = false;
  @Output() handleClassDeleteClick = new EventEmitter<void>();

  constructor(private store: Store, private router: Router) {}

  onDeleteClass(selectedClass: ClassModel) {
    this.store.dispatch(selectProfessorClassForDelete({ selectedClass }));
    this.handleClassDeleteClick.emit();
  }

  onEditClass(selectedClass: ClassModel) {
    this.store.dispatch(selectProfessorClassForEdit({ selectedClass }));
    this.router.navigate(['/edit-class', selectedClass.id]);
  }
}
