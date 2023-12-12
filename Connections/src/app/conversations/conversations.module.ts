import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { GroupListItemsComponent } from './components/group-list-items/group-list-items.component';
import { ItemComponent } from './components/item/item.component';
import { ModalCreateComponent } from './components/modal-create/modal-create.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { ConversationsRoutingModule } from './conversations-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BroadcastPageComponent } from './pages/broadcast-page/broadcast-page.component';

@NgModule({
  declarations: [
    MainPageComponent,
    ModalCreateComponent,
    ModalDeleteComponent,
    ItemComponent,
    GroupListItemsComponent,
    BroadcastPageComponent,
  ],
  imports: [
    CommonModule,
    ConversationsRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
  ],
})
export class ConversationsModule { }
