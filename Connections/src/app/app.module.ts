import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RequestInterceptor } from './core/interceptors/request.interceptor';
import { AuthEffects } from './store/auth-store/effects';
import { authReducer } from './store/auth-store/reducers';
import { ChatEffects } from './store/chat-store/chat.effects';
import { chatReducer } from './store/chat-store/chat.reducers';

const dialogMock = { close: () => { } };

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    StoreModule.forRoot({ auth: authReducer, chat: chatReducer }, {}),
    EffectsModule.forRoot([AuthEffects, ChatEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: MatDialogRef,
      useValue: { dialogMock },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
