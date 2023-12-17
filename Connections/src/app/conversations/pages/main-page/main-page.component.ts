/* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { getConversationList, getListOfGroup, getListOfPeople } from 'src/app/store/chat-store/chat.actions';
import {
  selectConversationList,
  selectGrouplistLoaded,
  selectLoading,
  selectLoadingButton,
  selectPeoplelistLoaded,
} from 'src/app/store/chat-store/chat.selectors';

import { ModalCreateComponent } from '../../components/modal-create/modal-create.component';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public countGroup$?: Observable<number>;

  public countPeople$?: Observable<number>;

  loading$: Observable<boolean> = this.store.select(selectLoading);

  loadingButton$: Observable<boolean> = this.store.select(selectLoadingButton);

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private chatService: ChatService,
    private destroyRef: DestroyRef,
  ) {
  }

  ngOnInit(): void {
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

  public openDialog(): void {
    this.dialog.open(ModalCreateComponent);
  }

  public getGroup(): void {
    this.store.dispatch(getListOfGroup());
    this.countGroup$ = this.chatService.timerStart();
  }

  public getPeople(): void {
    this.store.dispatch(getListOfPeople());
    this.store.dispatch(getConversationList());
    this.countPeople$ = this.chatService.timerStart();
  }
}
