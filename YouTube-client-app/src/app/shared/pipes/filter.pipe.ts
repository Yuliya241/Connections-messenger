import { Pipe, PipeTransform } from '@angular/core';

import { VideoItem } from '../../youtube/models/search-item.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: VideoItem[], value: string): VideoItem[] {
    if (!value) {
      return items;
    }
    return items.filter((item) => item.snippet.title.toLowerCase().includes(value.toLowerCase()));
  }
}
