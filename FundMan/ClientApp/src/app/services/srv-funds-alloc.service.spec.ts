import { TestBed } from '@angular/core/testing';

import { FundsAllocService } from './srv-funds-alloc.service';

describe('SrvFundsAllocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FundsAllocService = TestBed.get(FundsAllocService);
    expect(service).toBeTruthy();
  });
});
