import { Component } from '@angular/core';
import { NavComponent } from '../../../../shared/components/nav/nav.component';
import { ReserveSeatComponent } from '../../components/reserve-seat/reserve-seat.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadClassByClassId } from '../../../../state/class/class.actions';
import { Observable, of } from 'rxjs';
import { ClassModel } from '../../../../state/class/models/class.model';
import { selectSelectedClass } from '../../../../state/class/class.selectors';
import { CommonModule } from '@angular/common';
import {
  selectAuthUserProfessor,
  selectAuthUserStudent,
} from '../../../../state/auth/auth.selectors';
import { Professor } from '../../../../state/auth/models/professor.model';
import { Student } from '../../../../state/auth/models/student.model';
import { ClassInfoDetailsComponent } from '../../components/class-info-details/class-info-details.component';

@Component({
  selector: 'app-class-info-page',
  imports: [
    NavComponent,
    ReserveSeatComponent,
    CommonModule,
    ClassInfoDetailsComponent,
  ],
  templateUrl: './class-info-page.component.html',
  styleUrl: './class-info-page.component.scss',
})
export class ClassInfoPageComponent {
  selectedClass: Observable<ClassModel | null> = of(null);
  professor: Observable<Professor | null> = of(null);
  student: Observable<Student | null> = of(null);
  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    const classId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(loadClassByClassId({ classId: Number(classId) }));
    this.selectedClass = this.store.select(selectSelectedClass);
    this.professor = this.store.select(selectAuthUserProfessor);
    this.student = this.store.select(selectAuthUserStudent);
  }
}
