import { TestBed } from '@angular/core/testing';

import { MapleafletService } from './mapleaflet.service';

describe('MapleafletService', () => {
  let service: MapleafletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapleafletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
