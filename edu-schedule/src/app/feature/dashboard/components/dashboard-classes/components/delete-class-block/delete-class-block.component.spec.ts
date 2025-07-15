import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClassBlockComponent } from './delete-class-block.component';

describe('DeleteClassBlockComponent', () => {
  let component: DeleteClassBlockComponent;
  let fixture: ComponentFixture<DeleteClassBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteClassBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteClassBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
