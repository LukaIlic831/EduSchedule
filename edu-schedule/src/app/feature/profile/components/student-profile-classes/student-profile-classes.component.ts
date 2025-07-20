import { Component, Input } from '@angular/core';
import { ClassComponent } from '../../../../shared/components/class/class.component';
import { Observable, of } from 'rxjs';
import { ClassModel } from '../../../../state/class/models/class.model';
import { Store } from '@ngrx/store';
import { LoadClassesWithStudentReservedSeat } from '../../../../state/class/class.actions';
import { selectAllClasses } from '../../../../state/class/class.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-profile-classes',
  imports: [ClassComponent, CommonModule],
  templateUrl: './student-profile-classes.component.html',
  styleUrl: './student-profile-classes.component.scss',
})
export class StudentProfileClassesComponent {
  @Input() userId: number | null = null;
  @Input() index: number | null = null;
  studentClasses: Observable<ClassModel[]> = of([]);
  constructor(private store: Store) {}
  ngOnInit() {
    this.userId &&
      this.index &&
      this.store.dispatch(
        LoadClassesWithStudentReservedSeat({
          index: this.index,
          userId: this.userId,
        })
      );
    this.studentClasses = this.store.select(selectAllClasses);
  }
}
