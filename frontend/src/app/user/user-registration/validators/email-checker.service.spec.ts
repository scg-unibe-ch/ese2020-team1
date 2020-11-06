import { TestBed } from '@angular/core/testing';

import { EmailCheckerService } from './email-checker.service';

describe('EmailCheckerService', () => {
  let service: EmailCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
