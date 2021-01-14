import { TestBed } from '@angular/core/testing';

import { AuthenticationHeaderService } from './authentication-header.service';

describe('AuthenticationHeaderService', () => {
  let service: AuthenticationHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
