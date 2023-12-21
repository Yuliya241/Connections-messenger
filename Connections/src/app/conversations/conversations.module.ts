import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { GroupItemComponent } from './components/group-item/group-item.component';
import { GroupListItemsComponent } from './components/group-list-items/group-list-items.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageComponent } from './components/message/message.component';
import { ModalCreateComponent } from './components/modal-create/modal-create.component';
import { ModalDeleteGroupdialogComponent } from './components/modal-delete-groupdialog/modal-delete-groupdialog.component';
import { ModalDeleteUserdialogComponent } from './components/modal-delete-userdialog/modal-delete-userdialog.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { PeopleItemComponent } from './components/people-item/people-item.component';
import { PeopleListItemsComponent } from './components/people-list-items/people-list-items.component';
import { ConversationsRoutingModule } from './conversations-routing.module';
import { ConversationPageComponent } from './pages/conversation-page/conversation-page.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SortByDatePipe } from './pipes/sort-by-date.pipe';

@NgModule({
  declarations: [
    MainPageComponent,
    ModalCreateComponent,
    ModalDeleteComponent,
    GroupItemComponent,
    GroupListItemsComponent,
    GroupPageComponent,
    PeopleItemComponent,
    PeopleListItemsComponent,
    ConversationPageComponent,
    MessageComponent,
    MessageListComponent,
    ModalDeleteGroupdialogComponent,
    SortByDatePipe,
    ModalDeleteUserdialogComponent,
  ],
  imports: [
    CommonModule,
    ConversationsRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class ConversationsModule { }
