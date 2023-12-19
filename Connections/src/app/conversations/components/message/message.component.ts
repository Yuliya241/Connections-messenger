import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { find, map, Observable, switchMap } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Message } from 'src/app/store/chat-store/chat-state.models';
import { selectListOfPeople } from 'src/app/store/chat-store/chat.selectors';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() messageItem?: Message;

  private localStorage = inject(LocalStorageService);

  isAuthor = false;

  peopleNames$?: Observable<string | undefined>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.peopleNames$ = this.store.select(selectListOfPeople).pipe(
      switchMap((items) => items || []),
      find((it) => this.messageItem?.authorID.S === it.uid.S),
      map((item) => {
        return (this.messageItem?.authorID.S === item?.uid.S) ? item?.name.S : 'Me';
      }),
    );

    const uid = this.localStorage.getItemUid();
    this.isAuthor = this.messageItem?.authorID.S === uid;
  }
}
