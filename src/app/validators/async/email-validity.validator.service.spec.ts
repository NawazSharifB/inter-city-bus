import { TestBed } from '@angular/core/testing';

import { EmailValidityValidatorService } from './email-validity.validator.service';

describe('EmailValidity.ValidatorService', () => {
  let service: EmailValidityValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailValidityValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
