import { TestBed } from '@angular/core/testing';

import { BusStopNameResolverService } from './bus-stop-name-resolver.service';

describe('BusStopNameResolverService', () => {
  let service: BusStopNameResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusStopNameResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
