import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileDataComponent } from './student-profile-data.component';

describe('StudentProfileDataComponent', () => {
  let component: StudentProfileDataComponent;
  let fixture: ComponentFixture<StudentProfileDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProfileDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProfileDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
