import { Component, OnInit } from '@angular/core';
import { selectSelectedClass } from '../../../../state/class/class.selectors';
import { ClassModel } from '../../../../state/class/models/class.model';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadClassByClassId } from '../../../../state/class/class.actions';
import { ClassFormComponent } from '../../components/class-form/class-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-class-page',
  imports: [ClassFormComponent, CommonModule],
  templateUrl: './edit-class-page.component.html',
  styleUrl: './edit-class-page.component.scss',
})
export class EditClassPageComponent implements OnInit {
  classId: number = 0;
  formTitle = 'Update Class';
  selectedClass: Observable<ClassModel | null> = of(null);
  constructor(private store: Store, private route: ActivatedRoute) {
    this.classId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.store.dispatch(loadClassByClassId({ classId: this.classId }));
    this.selectedClass = this.store.select(selectSelectedClass);
  }
}
