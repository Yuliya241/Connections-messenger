import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { HeaderComponent } from '../../core/components/header/header/header.component';
import { SearchVideosService } from './search-videos.service';

describe('SearchVideosService', () => {
  let service: SearchVideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HeaderComponent],
      providers: [provideMockStore({})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(SearchVideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
