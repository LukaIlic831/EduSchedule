import { Component, Input, OnInit } from '@angular/core';
import { ClassComponent } from '../../../../shared/components/class/class.component';
import { Store } from '@ngrx/store';
import { loadProfessorClasses } from '../../../../state/class/class.actions';
import { selectAllClasses } from '../../../../state/class/class.selectors';
import { Observable, of } from 'rxjs';
import { ClassModel } from '../../../../state/class/models/class.model';
import { CommonModule } from '@angular/common';
import { DeleteClassBlockComponent } from './components/delete-class-block/delete-class-block.component';
import { NoClassesComponent } from '../../../../shared/components/no-classes/no-classes.component';

@Component({
  selector: 'app-dashboard-classes',
  imports: [
    ClassComponent,
    CommonModule,
    DeleteClassBlockComponent,
    NoClassesComponent,
  ],
  templateUrl: './dashboard-classes.component.html',
  styleUrl: './dashboard-classes.component.scss',
})
export class DashboardClassesComponent implements OnInit {
  @Input() professorId: number | null = null;
  professorClasses: Observable<ClassModel[]> = of([]);
  isDeleteClassBlockVisible = false;
  constructor(private store: Store) {}
  ngOnInit() {
    this.professorId &&
      this.store.dispatch(
        loadProfessorClasses({ professorId: this.professorId })
      );
    this.professorClasses = this.store.select(selectAllClasses);
  }

  handleOnClickClassDelete() {
    this.isDeleteClassBlockVisible = true;
  }

  handleOnClickClassDeleteBlockButton() {
    this.isDeleteClassBlockVisible = false;
  }
}
