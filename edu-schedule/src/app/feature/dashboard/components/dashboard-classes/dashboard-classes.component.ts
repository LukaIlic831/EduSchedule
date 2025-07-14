import { Component, Input, OnInit } from '@angular/core';
import { ClassComponent } from '../../../../shared/components/class/class.component';
import { Store } from '@ngrx/store';
import { loadProfessorClasses } from '../../../../state/class/class.actions';
import { selectAllClasses } from '../../../../state/class/class.selectors';
import { Observable, of } from 'rxjs';
import { ClassModel } from '../../../../state/class/models/class.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-classes',
  imports: [ClassComponent, CommonModule],
  templateUrl: './dashboard-classes.component.html',
  styleUrl: './dashboard-classes.component.scss',
})
export class DashboardClassesComponent implements OnInit {
  @Input() professorId = 0;
  professorClasses: Observable<ClassModel[]> = of([]);
  constructor(private store: Store) {}
  ngOnInit() {
    this.store.dispatch(
      loadProfessorClasses({ professorId: this.professorId })
    );
    this.professorClasses = this.store.select(selectAllClasses);
  }
}
