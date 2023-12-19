import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  private router = inject(Router);

  @Input() item?: Person;

  @Input() companion?: Companion;

  url?: string;

  hasConversation$?: Observable<Companion | undefined>;

  conversationId$?: Observable<string | undefined>;

  ngOnInit() {
    this.hasConversation$ = this.store.select(selectConversationList).pipe(
      map((items) => {
        return items?.find((member: Companion) => this.item?.uid.S === member.companionID?.S);
      }),
    );

    this.conversationId$ = this.store.select(selectConversationList).pipe(
      map((items) => {
        const item = items?.find((member: Companion) => this.item?.uid.S === member.companionID?.S);
        return item?.id?.S;
      }),
    );
  }

  createDialog() {
    this.store.dispatch(createConversation({ companion: this.item?.uid.S || '' }));
  }

  routToDialogPage() {
    this.conversationId$?.subscribe((a) => this.url = a);
    this.router.navigate(['main/conversation/', this.url]);
  }
}
