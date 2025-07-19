import { TestBed } from '@angular/core/testing';

import { EducationDataServiceService } from './education-data-service.service';

describe('EducationDataServiceService', () => {
  let service: EducationDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
