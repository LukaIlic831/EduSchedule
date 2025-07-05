import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorDashboardPageComponent } from './professor-dashboard-page.component';

describe('ProfessorDashboardPageComponent', () => {
  let component: ProfessorDashboardPageComponent;
  let fixture: ComponentFixture<ProfessorDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorDashboardPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
