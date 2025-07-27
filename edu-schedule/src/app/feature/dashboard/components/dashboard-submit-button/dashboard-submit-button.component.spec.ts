import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSubmitButtonComponent } from './dashboard-submit-button.component';

describe('DashboardSubmitButtonComponent', () => {
  let component: DashboardSubmitButtonComponent;
  let fixture: ComponentFixture<DashboardSubmitButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSubmitButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSubmitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
