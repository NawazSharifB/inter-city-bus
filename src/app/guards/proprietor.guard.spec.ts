import { TestBed } from '@angular/core/testing';

import { ProprietorGuard } from './proprietor.guard';

describe('ProprietorGuard', () => {
  let guard: ProprietorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProprietorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
