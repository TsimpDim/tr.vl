import { TestBed } from '@angular/core/testing';

import { RoutesMetadataService } from './routes.service';

describe('RoutesService', () => {
  let service: RoutesMetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutesMetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
