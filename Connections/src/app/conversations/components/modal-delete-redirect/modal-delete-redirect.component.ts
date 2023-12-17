import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { selectLoading } from 'src/app/store/auth-store/selectors';
import { deleteGroup } from 'src/app/store/chat-store/chat.actions';

@Component({
  selector: 'app-modal-delete-redirect',
  templateUrl: './modal-delete-redirect.component.html',
  styleUrls: ['./modal-delete-redirect.component.scss'],
})
export class ModalDeleteRedirectComponent {
  loading$: Observable<boolean> = this.store.select(selectLoading);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string; },
    private store: Store,
    public dialog: MatDialogRef<ModalDeleteRedirectComponent>,
    private router: Router,
  ) { }

  public closeDialog(): void {
    this.dialog.close(ModalDeleteRedirectComponent);
  }

  public deleteGroup() {
    this.store.dispatch(deleteGroup({ groupID: this.data.id }));
    this.router.navigate(['main']);
  }
}
