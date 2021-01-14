import { TestBed } from '@angular/core/testing';

import { BusProprietorService } from './bus-proprietor.service';

describe('BusProprietorService', () => {
  let service: BusProprietorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusProprietorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
