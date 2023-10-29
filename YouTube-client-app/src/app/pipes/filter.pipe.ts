import { Pipe, PipeTransform } from '@angular/core';

import { Item } from '../models/search-item.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: Item[], value: string): Item[] {
    if (!value) {
      return items;
    }
    return items.filter((item) => item.snippet.title.toLowerCase().includes(value.toLowerCase()));
  }
}
