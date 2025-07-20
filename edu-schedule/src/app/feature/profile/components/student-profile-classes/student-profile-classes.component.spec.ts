import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileClassesComponent } from './student-profile-classes.component';

describe('StudentProfileClassesComponent', () => {
  let component: StudentProfileClassesComponent;
  let fixture: ComponentFixture<StudentProfileClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProfileClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProfileClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
