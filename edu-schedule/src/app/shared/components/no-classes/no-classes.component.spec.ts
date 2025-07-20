import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoClassesComponent } from './no-classes.component';

describe('NoClassesComponent', () => {
  let component: NoClassesComponent;
  let fixture: ComponentFixture<NoClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
