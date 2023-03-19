import { TestBed } from '@angular/core/testing';

import { AddProuductService } from './add-prouduct.service';

describe('AddProuductService', () => {
  let service: AddProuductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddProuductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
