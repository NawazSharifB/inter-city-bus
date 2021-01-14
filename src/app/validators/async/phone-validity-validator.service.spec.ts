import { TestBed } from '@angular/core/testing';

import { PhoneValidityValidatorService } from './phone-validity-validator.service';

describe('PhoneValidityValidatorService', () => {
  let service: PhoneValidityValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneValidityValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
