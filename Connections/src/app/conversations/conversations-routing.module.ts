import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '../core/guards/auth.guard';
import { ConversationPageComponent } from './pages/conversation-page/conversation-page.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  {
    path: 'group/:groupID',
    canActivate: [authGuard],
    component: GroupPageComponent,
  },
  {
    path: 'conversation/:conversationID',
    canActivate: [authGuard],
    component: ConversationPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversationsRoutingModule { }
