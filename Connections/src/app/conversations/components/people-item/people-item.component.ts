import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { map, Observable } from 'rxjs';
import { Companion, Person } from 'src/app/store/chat-store/chat-state.models';
import { createConversation } from 'src/app/store/chat-store/chat.actions';
import { selectConversationList } from 'src/app/store/chat-store/chat.selectors';

@Component({
  selector: 'app-people-item',
  templateUrl: './people-item.component.html',
  styleUrls: ['./people-item.component.scss'],
})
export class PeopleItemComponent implements OnInit {
  private store = inject(Store);

  @Input() item?: Person;

  hasConversation$?: Observable<Companion | undefined>;

  ngOnInit() {
    this.hasConversation$ = this.store.select(selectConversationList).pipe(
      map((items) => {
        return items?.find((member: Companion) => this.item?.uid.S === member.companionID.S);
      }),
    );
  }

  createDialog() {
    this.store.dispatch(createConversation({ companion: this.item?.uid.S || '' }));
  }
}
