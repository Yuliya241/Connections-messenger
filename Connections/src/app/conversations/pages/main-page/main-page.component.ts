import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { map, Observable, take, timer } from 'rxjs';
import { getListOfGroup } from 'src/app/store/chat-store/chat.actions';
import { selectGrouplistLoaded, selectLoading } from 'src/app/store/chat-store/chat.selectors';

import { ModalCreateComponent } from '../../components/modal-create/modal-create.component';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public countdown$?: Observable<number>;

  loading$: Observable<boolean> = this.store.select(selectLoading);

  count = 60;

  constructor(
    public dialog: MatDialog,
    private store: Store,
    public chatService: ChatService,
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
  }

  public openDialog(): void {
    this.dialog.open(ModalCreateComponent);
  }

  public getGroup(): void {
    this.store.dispatch(getListOfGroup());
    this.countdown$ = timer(1000, 1000).pipe(
      map((i) => this.count - i),
      take(this.count + 1),
    );
  }
}
