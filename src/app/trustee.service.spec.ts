import { TestBed, inject } from '@angular/core/testing';

import { TrusteeService } from './trustee.service';

describe('TrusteeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrusteeService]
    });
  });

  it('should be created', inject([TrusteeService], (service: TrusteeService) => {
    expect(service).toBeTruthy();
  }));
});
