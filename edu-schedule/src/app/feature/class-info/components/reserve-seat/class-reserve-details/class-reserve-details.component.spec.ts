import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassReserveDetailsComponent } from './class-reserve-details.component';

describe('ClassReserveDetailsComponent', () => {
  let component: ClassReserveDetailsComponent;
  let fixture: ComponentFixture<ClassReserveDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassReserveDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassReserveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
