import { TestBed } from '@angular/core/testing';

import { CartwishlistService } from './cartwishlist.service';

describe('CartwishlistService', () => {
  let service: CartwishlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartwishlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
