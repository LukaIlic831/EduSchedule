import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorInfoDetailsComponent } from './professor-info-details.component';

describe('ProfessorInfoDetailsComponent', () => {
  let component: ProfessorInfoDetailsComponent;
  let fixture: ComponentFixture<ProfessorInfoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorInfoDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
