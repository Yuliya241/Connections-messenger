import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConversationsRoutingModule } from './conversations-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';

@NgModule({
  declarations: [
    MainPageComponent,
  ],
  imports: [
    CommonModule,
    ConversationsRoutingModule,
  ],
})
export class ConversationsModule { }
