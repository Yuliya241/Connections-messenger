import { Component } from '@angular/core';

import response from './data/response.json';
import { Sort, SortDirections } from './enums/enums';
import { Item } from './models/search-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'YouTube-client-app';

  isFilterShow = false;

  items: Item[] = [];

  text = '';

  dateOrder: SortDirections;

  viewsOrder: SortDirections;

  showSearchResults() {
    this.items = response.items;
  }

  showFilterButtons() {
    this.isFilterShow = !this.isFilterShow;
  }

  printText(text: string) {
    this.text = text;
  }

  orderByView() {
    this.viewsOrder = this.toggleSortDirection(this.viewsOrder);
  }

  orderByDate() {
    this.dateOrder = this.toggleSortDirection(this.dateOrder);
  }

  toggleSortDirection(direction: SortDirections): SortDirections {
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
