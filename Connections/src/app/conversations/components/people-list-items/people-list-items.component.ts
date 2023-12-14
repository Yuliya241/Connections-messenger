import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectListOfPeople } from 'src/app/store/chat-store/chat.selectors';

@Component({
  selector: 'app-people-list-items',
  templateUrl: './people-list-items.component.html',
  styleUrls: ['./people-list-items.component.scss'],
})
export class PeopleListItemsComponent {
  listOfPeople$ = this.store.select(selectListOfPeople);

  constructor(private store: Store) { }
}
