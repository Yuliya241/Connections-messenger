import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { selectLoading } from 'src/app/store/auth-store/selectors';
import { deleteGroup } from 'src/app/store/chat-store/chat.actions';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss'],
})
export class ModalDeleteComponent {
  loading$: Observable<boolean> = this.store.select(selectLoading);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string; },
    private store: Store,
    public dialog: MatDialogRef<ModalDeleteComponent>,
  ) { }

  public closeDialog(): void {
    this.dialog.close(ModalDeleteComponent);
  }

  public deleteGroup() {
    this.store.dispatch(deleteGroup({ groupID: this.data.id }));
  }
}
