import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClassesComponent } from './dashboard-classes.component';

describe('DashboardClassesComponent', () => {
  let component: DashboardClassesComponent;
  let fixture: ComponentFixture<DashboardClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
