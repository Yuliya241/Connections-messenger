import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { environment } from '../../../environments/environment';
import { HeaderComponent } from '../../core/components/header/header/header.component';
import { videoResults } from '../models/test.examples';
import { SearchVideosService } from './search-videos.service';

describe('SearchVideosService', () => {
  let service: SearchVideosService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HeaderComponent],
      providers: [provideMockStore({})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(SearchVideosService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call searchVideos', () => {
    service.searchVideo('angular', '').subscribe((result) => {
      expect(result).toEqual(videoResults.items);
    });
    const request = httpTestingController.expectOne({
      method: 'GET',
      url: `${environment.apiSearchUrl}?part=snippet&type=video&maxResults=20&q=angular&pageToken=`,
    });
    request.flush(videoResults);
  });

  it('should call searchVideoById', () => {
    const id = 'zNWAPJW8p-o';
    service.searchVideoById(id).subscribe((result) => {
      expect(result).toEqual(videoResults.items);
    });

    const request = httpTestingController.expectOne({
      method: 'GET',
      url: `${environment.apiVideoUrl}?id=${id}&part=snippet,statistics`,
    });

    request.flush(videoResults);
  });
});
