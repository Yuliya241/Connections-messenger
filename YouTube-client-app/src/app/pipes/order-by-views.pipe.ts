import { Pipe, PipeTransform } from '@angular/core';

import { Sort, SortDirections } from '../enums/enums';
import { Item } from '../models/search-item.model';

@Pipe({
  name: 'orderByViews',
})
export class OrderByViewsPipe implements PipeTransform {
  transform(items: Item[], direction: SortDirections): Item[] {
    switch (direction) {
      case Sort.ASC:
        return items.sort((a, b) => {
          const aCountViews = Number(a.statistics.viewCount);
          const bCountViews = Number(b.statistics.viewCount);

          return aCountViews - bCountViews;
        });
      case Sort.DESC:
        return items.sort((a, b) => {
          const aCountViews = Number(a.statistics.viewCount);
          const bCountViews = Number(b.statistics.viewCount);

          return bCountViews - aCountViews;
        });
      default:
        return items;
    }
  }
}
