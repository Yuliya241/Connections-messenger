import { Pipe, PipeTransform } from '@angular/core';

import { Sort, SortDirections } from 'src/app/shared/enums/enums';
import { Message } from 'src/app/store/chat-store/chat-state.models';

@Pipe({
  name: 'sortByDate',
})
export class SortByDatePipe implements PipeTransform {
  transform(items: Message[], direction: SortDirections): Message[] {
    switch (direction) {
      case Sort.ASC:
        return [...items].sort((a, b) => {
          const aCreatedAt = Number(a.createdAt?.S);
          const bCreatedAt = Number(b.createdAt?.S);

          return aCreatedAt - bCreatedAt;
        });
      default:
        return [...items];
    }
  }
}
