import { TestBed } from '@angular/core/testing';

import { DatamatService } from './datamat.service';

describe('DatamatService', () => {
  let service: DatamatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatamatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
