import { Injectable } from '@angular/core';

import { Sort, SortDirections } from 'src/app/shared/enums/enums';

import response from '../../shared/data/response.json';
import { Item } from '../models/search-item.model';
import { Response } from '../models/search-response.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private readonly data: Response = response;

  isShowResults = false;

  isFilterShow = false;

  searchTerm = '';

  dateOrder: SortDirections;

  viewsOrder: SortDirections;

  getData(): Item[] {
    return this.data.items;
  }

  getItemById(id: string): Item | undefined {
    return this.data.items.find((item) => item.id === id);
  }

  showResults(): void {
    this.isShowResults = true;
  }

  showFilterBlock(): void {
    this.isFilterShow = !this.isFilterShow;
  }

  print(text: string) {
    this.searchTerm = text;
  }

  sortByViews() {
    this.viewsOrder = this.toggleSort(this.viewsOrder);
  }

  sortByDate() {
    this.dateOrder = this.toggleSort(this.dateOrder);
  }

  toggleSort(direction: SortDirections): SortDirections {
    switch (direction) {
      case Sort.ASC:
        return Sort.DESC;
      case Sort.DESC:
        return Sort.ASC;
      default:
        return Sort.ASC;
    }
  }
}
