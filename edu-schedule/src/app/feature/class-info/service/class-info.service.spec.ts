import { TestBed } from '@angular/core/testing';

import { ClassInfoService } from './class-info.service';

describe('ClassInfoService', () => {
  let service: ClassInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
