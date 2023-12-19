import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { selectLoading } from 'src/app/store/auth-store/selectors';
import { deleteDialog } from 'src/app/store/chat-store/chat.actions';

@Component({
  selector: 'app-modal-delete-userdialog',
  templateUrl: './modal-delete-userdialog.component.html',
  styleUrls: ['./modal-delete-userdialog.component.scss'],
})
export class ModalDeleteUserdialogComponent {
  loading$: Observable<boolean> = this.store.select(selectLoading);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string; },
    private store: Store,
    public dialog: MatDialogRef<ModalDeleteUserdialogComponent>,
    private router: Router,
  ) { }

  public closeDialog(): void {
    this.dialog.close(ModalDeleteUserdialogComponent);
  }

  public deleteConversation() {
    this.store.dispatch(deleteDialog({ conversationID: this.data.id }));
    this.router.navigate(['main']);
  }
}
