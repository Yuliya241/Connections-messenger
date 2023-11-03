import { Pipe, PipeTransform } from '@angular/core';

import { Item } from '../../youtube/models/search-item.model';
import { Sort, SortDirections } from '../enums/enums';

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
