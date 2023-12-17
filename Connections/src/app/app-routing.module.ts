import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './auth/pages/profile/profile.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { authGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main',
  },
  {
    path: 'main',
    canActivate: [authGuard],
    loadChildren: () => import('./conversations/conversations.module').then((m) => m.ConversationsModule),
  },
  {
    path: 'signin',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    component: ProfileComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true, paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
