import { Component, inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Item } from 'src/app/store/chat-store/chat-state.models';

import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss'],
})
export class GroupItemComponent implements OnInit {
  private dialog = inject(MatDialog);

  private localStorage = inject(LocalStorageService);

  @Input() item?: Item;

  canDelete = false;

  public openDeleteDialog() {
    this.dialog.open(ModalDeleteComponent, { data: { id: this.item?.id?.S } });
  }

  ngOnInit() {
    const uid = this.localStorage.getItemUid();
    this.canDelete = this.item?.createdBy?.S === uid;
  }
}
