import { TestBed } from '@angular/core/testing';

import { FormesService } from './formes.service';

describe('FormesService', () => {
  let service: FormesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
