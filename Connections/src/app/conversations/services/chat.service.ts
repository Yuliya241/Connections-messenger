import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Group, Item } from 'src/app/store/chat-store/chat-state.models';
import { environment } from 'src/environments/environment';

import { ModalCreateComponent } from '../components/modal-create/modal-create.component';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public dialog = inject(MatDialogRef<ModalCreateComponent>);

  constructor(private http: HttpClient) {
  }

  public getListOfGroup() {
    return this.http.get<Group>(environment.getListOfGroup);
  }

  public createGroup(name: string) {
    return this.http.post<Item>(environment.postGroup, { name });
  }

  public deleteGroup(groupID: string) {
    const urlParams = new HttpParams()
      .set('groupID', groupID);
    return this.http.delete(environment.deleteGroup, { params: urlParams });
  }
}
