/* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { distinctUntilChanged, map, Observable, shareReplay, tap } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { selectLoading } from 'src/app/store/auth-store/selectors';
import { Message } from 'src/app/store/chat-store/chat-state.models';
import {
  getConversationList,
  getLastMessages,
  getListOfGroup,
  getListOfMessages,
  getListOfPeople,
  sendMessages,
  setSelectedGroup,
} from 'src/app/store/chat-store/chat.actions';
import {
  selectConversationList,
  selectCurrentGroup,
  selectGrouplistLoaded,
  selectListOfGroup,
  selectPeoplelistLoaded,
} from 'src/app/store/chat-store/chat.selectors';

import { ModalDeleteGroupdialogComponent } from '../../components/modal-delete-groupdialog/modal-delete-groupdialog.component';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss'],
})
export class GroupPageComponent implements OnInit {
  @Input() messageItem?: Message;

  @Input() messages?: Message[];

  id: string | null = null;

  canDelete$?: Observable<boolean>;

  isSubmitted = false;

  counter$?: Observable<number>;

  isLoadMessagesActionDispatched = false;

  group$ = this.store.select(selectCurrentGroup).pipe(
    distinctUntilChanged(),
    tap((group) => {
      if (this.isLoadMessagesActionDispatched) return;

      this.isLoadMessagesActionDispatched = true;

      if (!group) {
        this.store.dispatch(getListOfMessages(
          { groupID: this.id || '' },
        ));
      } else {
        const lastMessageTimeStamp = group.messagelist?.Items.at(-1)?.createdAt.S;
        this.store.dispatch(getLastMessages(
          { groupID: this.id || '', since: lastMessageTimeStamp || '' },
        ));
      }
    }),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );

  messageList$ = this.group$.pipe(map((group) => group?.messagelist?.Items));

  loading$: Observable<boolean> = this.store.select(selectLoading);

  formMessage = this.fb.group({
    text: ['', { nonNullable: true, validators: Validators.required }],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private chatService: ChatService,
    private destroyRef: DestroyRef,
    private dialog: MatDialog,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const uid = this.localStorage.getItemUid();

    this.id = this.route.snapshot.paramMap.get('groupID');

    if (!this.id) return;

    this.store.dispatch(setSelectedGroup({ groupID: this.id }));

    this.canDelete$ = this.store.select(selectListOfGroup).pipe(
      map((items) => {
        const currentGroup = items?.find((item) => item.id?.S === this.id);

        return currentGroup?.createdBy?.S === uid;
      }),
    );

    this.store.select(selectGrouplistLoaded)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe((isGrouplistLoaded) => {
        if (!isGrouplistLoaded) {
          this.store.dispatch(getListOfGroup());
        }
      });

    this.store.select(selectPeoplelistLoaded)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe((isPeoplelistLoaded) => {
        if (!isPeoplelistLoaded) {
          this.store.dispatch(getListOfPeople());
        }
      });
    this.store.select(selectConversationList)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe((isConversationListLoaded) => {
        if (!isConversationListLoaded) {
          this.store.dispatch(getConversationList());
        }
      });
  }

  get text() {
    return this.formMessage.controls.text;
  }

  public send(): void {
    this.store.dispatch(sendMessages(
      { groupID: this.id || '', message: this.formMessage.value.text || '' },
    ));
    this.formMessage.reset();
  }

  public updateMessages(message: Message[]): void {
    const lastMessageTimeStamp = message.at(-1)?.createdAt.S;
    this.store.dispatch(getLastMessages(
      { groupID: this.id || '', since: lastMessageTimeStamp || '' },
    ));
    this.counter$ = this.chatService.timerStart();
  }

  public deleteGroup() {
    this.dialog.open(ModalDeleteGroupdialogComponent, { data: { id: this.id } });
  }
}
