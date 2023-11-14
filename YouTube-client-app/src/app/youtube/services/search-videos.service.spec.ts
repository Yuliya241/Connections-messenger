import { TestBed } from '@angular/core/testing';

import { SearchVideosService } from './search-videos.service';

describe('SearchVideosService', () => {
  let service: SearchVideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchVideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
