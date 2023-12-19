import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { selectLoading } from 'src/app/store/auth-store/selectors';
import { deleteGroup } from 'src/app/store/chat-store/chat.actions';

@Component({
  selector: 'app-modal-delete-groupdialog',
  templateUrl: './modal-delete-groupdialog.component.html',
  styleUrls: ['./modal-delete-groupdialog.component.scss'],
})
export class ModalDeleteGroupdialogComponent {
  loading$: Observable<boolean> = this.store.select(selectLoading);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string; },
    private store: Store,
    public dialog: MatDialogRef<ModalDeleteGroupdialogComponent>,
    private router: Router,
  ) { }

  public closeDialog(): void {
    this.dialog.close(ModalDeleteGroupdialogComponent);
  }

  public deleteGroup() {
    this.store.dispatch(deleteGroup({ groupID: this.data.id }));
    this.router.navigate(['main']);
  }
}
