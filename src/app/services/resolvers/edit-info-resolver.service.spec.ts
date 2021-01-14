import { TestBed } from '@angular/core/testing';

import { EditInfoResolverService } from './edit-info-resolver.service';

describe('EditInfoResolverService', () => {
  let service: EditInfoResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditInfoResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
