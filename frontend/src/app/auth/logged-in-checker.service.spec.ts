import { TestBed } from '@angular/core/testing';

import { LoggedInCheckerService } from './logged-in-checker.service';

describe('LoggedInCheckerService', () => {
  let service: LoggedInCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedInCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
