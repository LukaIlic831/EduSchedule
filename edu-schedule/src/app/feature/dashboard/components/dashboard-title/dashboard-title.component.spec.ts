import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTitleComponent } from './dashboard-title.component';

describe('DashboardTitleComponent', () => {
  let component: DashboardTitleComponent;
  let fixture: ComponentFixture<DashboardTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
