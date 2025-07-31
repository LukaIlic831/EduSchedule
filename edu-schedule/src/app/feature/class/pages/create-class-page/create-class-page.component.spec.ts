import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassPageComponent } from './create-class-page.component';

describe('CreateClassPageComponent', () => {
  let component: CreateClassPageComponent;
  let fixture: ComponentFixture<CreateClassPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateClassPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateClassPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
