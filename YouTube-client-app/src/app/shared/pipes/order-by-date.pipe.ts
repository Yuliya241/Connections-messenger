import { Pipe, PipeTransform } from '@angular/core';

import { VideoItem } from '../../youtube/models/search-item.model';
import { Sort, SortDirections } from '../enums/enums';

@Pipe({
  name: 'orderByDate',
})
export class OrderByDatePipe implements PipeTransform {
  transform(items: VideoItem[], direction: SortDirections): VideoItem[] {
    switch (direction) {
      case Sort.ASC:
        return items.sort((a, b) => {
          const aPublishedDate = Date.parse(a.snippet.publishedAt);
          const bPublishedDate = Date.parse(b.snippet.publishedAt);

          return aPublishedDate - bPublishedDate;
        });
      case Sort.DESC:
        return items.sort((a, b) => {
          const aPublishedDate = Date.parse(a.snippet.publishedAt);
          const bPublishedDate = Date.parse(b.snippet.publishedAt);

          return bPublishedDate - aPublishedDate;
        });
      default:
        return items;
    }
  }
}
