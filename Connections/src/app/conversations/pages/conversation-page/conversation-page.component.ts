/* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { distinctUntilChanged, map, Observable, shareReplay, tap } from 'rxjs';
import { selectLoading } from 'src/app/store/auth-store/selectors';
import { Message } from 'src/app/store/chat-store/chat-state.models';
import {
  getConversationList,
  getDialogMessages,
  getListOfGroup,
  getListOfPeople,
  sendDialogMessages,
  setSelectedUser,
  updateDialogMessages,
} from 'src/app/store/chat-store/chat.actions';
import {
  selectConversationList,
  selectCurrentUser,
  selectGrouplistLoaded,
  selectPeoplelistLoaded,
} from 'src/app/store/chat-store/chat.selectors';

import { ModalDeleteUserdialogComponent } from '../../components/modal-delete-userdialog/modal-delete-userdialog.component';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss'],
})
export class ConversationPageComponent implements OnInit {
  countDownTimer$?: Observable<number>;

  isSubmitted = false;

  messages?: Message[];

  id: string | null = null;

  loading$: Observable<boolean> = this.store.select(selectLoading);

  formMessage = this.fb.group({
    text: ['', { nonNullable: true, validators: Validators.required }],
  });

  isLoadMessagesActionDispatched = false;

  dialog$ = this.store.select(selectCurrentUser).pipe(
    distinctUntilChanged(),
    tap((dialog) => {
      if (this.isLoadMessagesActionDispatched) return;

      this.isLoadMessagesActionDispatched = true;

      if (!dialog) {
        this.store.dispatch(getDialogMessages(
          { conversationID: this.id || '' },
        ));
      } else {
        const lastMessageTimeStamp = dialog.messagelist?.Items.at(-1)?.createdAt.S;
        this.store.dispatch(updateDialogMessages(
          { conversationID: this.id || '', since: lastMessageTimeStamp || '' },
        ));
      }
    }),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );

  messageList$ = this.dialog$.pipe(map((dialog) => dialog?.messagelist?.Items));

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private chatService: ChatService,
    private destroyRef: DestroyRef,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('conversationID');

    if (!this.id) return;

    this.store.dispatch(setSelectedUser({ conversationID: this.id }));

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
    this.store.dispatch(sendDialogMessages(
      { conversationID: this.id || '', message: this.formMessage.value.text || '' },
    ));
    const lastMessageTimeStamp = this.messages?.at(-1)?.createdAt.S;
    this.store.dispatch(updateDialogMessages(
      { conversationID: this.id || '', since: lastMessageTimeStamp || '' },
    ));
    this.formMessage.reset();
  }

  public updateMessages(message: Message[]): void {
    const lastMessageTimeStamp = message.at(-1)?.createdAt.S;
    this.store.dispatch(updateDialogMessages(
      { conversationID: this.id || '', since: lastMessageTimeStamp || '' },
    ));
    this.countDownTimer$ = this.chatService.timerStart();
  }

  public deleteDialog() {
    this.dialog.open(ModalDeleteUserdialogComponent, { data: { id: this.id } });
  }
}
