import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchClassPageComponent } from './search-class-page.component';

describe('SearchClassPageComponent', () => {
  let component: SearchClassPageComponent;
  let fixture: ComponentFixture<SearchClassPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchClassPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchClassPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
