import { TestBed } from '@angular/core/testing';

import { ConfigmaterialService } from './configmaterial.service';

describe('ConfigmaterialService', () => {
  let service: ConfigmaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigmaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
