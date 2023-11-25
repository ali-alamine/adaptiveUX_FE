import { TestBed } from '@angular/core/testing';

import { PuNotificationService } from './pu-notification.service';

describe('PuNotificationService', () => {
  let service: PuNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
