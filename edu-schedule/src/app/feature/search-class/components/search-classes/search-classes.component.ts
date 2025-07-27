import { Component, Input, OnInit } from '@angular/core';
import { ClassComponent } from '../../../../shared/components/class/class.component';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ClassModel } from '../../../../state/class/models/class.model';
import { loadUniveristyClasses } from '../../../../state/class/class.actions';
import { selectFilteredClasses } from '../../../../state/class/class.selectors';
import { CommonModule } from '@angular/common';
import { NoClassesComponent } from '../../../../shared/components/no-classes/no-classes.component';

@Component({
  selector: 'app-search-classes',
  imports: [ClassComponent, CommonModule, NoClassesComponent],
  templateUrl: './search-classes.component.html',
  styleUrl: './search-classes.component.scss',
})
export class SearchClassesComponent implements OnInit {
  @Input() universityId!: number;
  @Input() studyProgramId!: number;
  universityClasses: Observable<ClassModel[]> = of([]);
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(
      loadUniveristyClasses({
        universityId: this.universityId,
        studyProgramId: this.studyProgramId,
      })
    );
    this.universityClasses = this.store.select(selectFilteredClasses);
  }
}
