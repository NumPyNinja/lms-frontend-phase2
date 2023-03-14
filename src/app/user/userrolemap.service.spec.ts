import { TestBed } from '@angular/core/testing';

import { UserrolemapService } from './userrolemap.service';

describe('UserrolemapService', () => {
  let service: UserrolemapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserrolemapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
