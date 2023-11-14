import { Injectable } from '@angular/core';

import { Sort, SortDirections } from 'src/app/shared/enums/enums';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  isShowResults = false;

  isFilterShow = false;

  searchTerm = '';

  dateOrder: SortDirections;

  viewsOrder: SortDirections;

  public showResults(): void {
    this.isShowResults = true;
  }

  public showFilterBlock(): void {
    this.isFilterShow = !this.isFilterShow;
  }

  public print(text: string) {
    this.searchTerm = text;
  }

  public sortByViews() {
    this.viewsOrder = this.toggleSort(this.viewsOrder);
  }

  public sortByDate() {
    this.dateOrder = this.toggleSort(this.dateOrder);
  }

  public toggleSort(direction: SortDirections): SortDirections {
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
