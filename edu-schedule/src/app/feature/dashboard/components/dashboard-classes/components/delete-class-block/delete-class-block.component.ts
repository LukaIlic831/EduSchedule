import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteProfessorClass } from '../../../../../../state/class/class.actions';
import { selectSelectedClass } from '../../../../../../state/class/class.selectors';
import { Observable, of } from 'rxjs';
import { ClassModel } from '../../../../../../state/class/models/class.model';
import { CommonModule } from '@angular/common';
import { Seat } from '../../../../../../state/education-data/models/seat.model';

@Component({
  selector: 'app-delete-class-block',
  imports: [CommonModule],
  templateUrl: './delete-class-block.component.html',
  styleUrl: './delete-class-block.component.scss',
})
export class DeleteClassBlockComponent implements OnInit {
  @Output() handleCloseDeleteClassBlock = new EventEmitter<void>();
  selectedClass: Observable<ClassModel | null> = of(null);

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.selectedClass = this.store.select(selectSelectedClass);
  }

  handleYesButtonClick(classId: number, reservedSeats: Seat[]) {
    const reservedSeatsIds = reservedSeats.map((seat) => seat.id);
    this.handleCloseDeleteClassBlock.emit();
    this.store.dispatch(deleteProfessorClass({ classId, reservedSeatsIds }));
  }

  handleNoButtonClick() {
    this.handleCloseDeleteClassBlock.emit();
  }
}
