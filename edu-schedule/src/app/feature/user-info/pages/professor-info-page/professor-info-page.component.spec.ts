import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorInfoPageComponent } from './professor-info-page.component';

describe('ProfessorInfoPageComponent', () => {
  let component: ProfessorInfoPageComponent;
  let fixture: ComponentFixture<ProfessorInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorInfoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
