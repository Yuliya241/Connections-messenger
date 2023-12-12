import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectListOfGroup } from 'src/app/store/chat-store/chat.selectors';

@Component({
  selector: 'app-group-list-items',
  templateUrl: './group-list-items.component.html',
  styleUrls: ['./group-list-items.component.scss'],
})
export class GroupListItemsComponent {
  listGroup$ = this.store.select(selectListOfGroup);

  constructor(private store: Store) { }
}
