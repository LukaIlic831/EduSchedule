import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassInfoDetailsComponent } from './class-info-details.component';

describe('ClassInfoDetailsComponent', () => {
  let component: ClassInfoDetailsComponent;
  let fixture: ComponentFixture<ClassInfoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassInfoDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
