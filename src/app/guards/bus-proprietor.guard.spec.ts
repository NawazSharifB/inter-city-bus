import { TestBed } from '@angular/core/testing';

import { BusProprietorGuard } from './bus-proprietor.guard';

describe('BusProprietorGuard', () => {
  let guard: BusProprietorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BusProprietorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
