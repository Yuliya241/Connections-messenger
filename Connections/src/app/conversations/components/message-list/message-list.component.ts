import { Component, Input } from '@angular/core';

import { Message } from 'src/app/store/chat-store/chat-state.models';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent {
  @Input() messageItems: Message[] = [];
}
