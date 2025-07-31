import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveLegendComponent } from './reserve-legend.component';

describe('ReserveLegendComponent', () => {
  let component: ReserveLegendComponent;
  let fixture: ComponentFixture<ReserveLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserveLegendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
