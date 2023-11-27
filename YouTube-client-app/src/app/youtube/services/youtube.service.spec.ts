import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SortDirections } from 'src/app/shared/enums/enums';

import { YoutubeService } from './youtube.service';

describe('YoutubeService', () => {
  let service: YoutubeService;
  let direction: SortDirections;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
    });
    service = TestBed.inject(YoutubeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should showFilterBlock', () => {
    service.showFilterBlock();
    expect(service.isFilterShow).toBeTruthy();
  });

  it('should print', () => {
    const text = 'angular';
    service.print(text);
    expect(service.searchTerm).toBe(text);
  });

  it('should sortByViews', () => {
    service.sortByViews();
    expect(service.viewsOrder).toBe('asc');
  });

  it('should sortByDate', () => {
    service.sortByDate();
    expect(service.dateOrder).toBe('asc');
  });

  it('should toggleSort', () => {
    service.toggleSort(direction);
    expect('asc').toBe('asc');
    expect('desc').toBe('desc');
  });
});
