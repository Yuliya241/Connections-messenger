import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { map, Observable, take, timer } from 'rxjs';
import {
  ActiveConversations,
  Companion,
  Group,
  GroupMessages,
  GroupPeople,
  Item,
  Message,
} from 'src/app/store/chat-store/chat-state.models';
import { environment } from 'src/environments/environment';

import { ModalCreateComponent } from '../components/modal-create/modal-create.component';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public dialog = inject(MatDialogRef<ModalCreateComponent>);

  private http = inject(HttpClient);

  count = 60;

  public getListOfGroup() {
    return this.http.get<Group>(environment.getListOfGroup);
  }

  public createGroup(name: string) {
    return this.http.post<Item>(environment.postGroup, { name });
  }

  public deleteGroup(groupID: string) {
    const urlParams = new HttpParams()
      .set('groupID', groupID);
    return this.http.delete<Item>(environment.deleteGroup, { params: urlParams });
  }

  public getListOfPeople() {
    return this.http.get<GroupPeople>(environment.getUsers);
  }

  public getActiveConversations() {
    return this.http.get<ActiveConversations>(environment.getConversationList);
  }

  public createConversation(companion: string) {
    return this.http.post<Companion>(environment.postConversation, { companion });
  }

  public timerStart(): Observable<number> | undefined {
    return timer(0, 1000).pipe(
      map((i) => this.count - i),
      take(this.count + 1),
    );
  }

  public sendMessage(groupID: string, message: string) {
    return this.http.post<Message>(environment.postMessage, { groupID, message });
  }

  public getLastMessages(groupID: string, since: string) {
    const urlParams = new HttpParams()
      .set('groupID', groupID)
      .set('since', since);
    return this.http.get<GroupMessages>(environment.getMessages, { params: urlParams });
  }

  public getMessages(groupID: string) {
    const urlParams = new HttpParams()
      .set('groupID', groupID);
    return this.http.get<GroupMessages>(environment.getMessages, { params: urlParams });
  }
}
