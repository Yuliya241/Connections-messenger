import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { ChatService } from 'src/app/conversations/services/chat.service';

import { AuthService } from '../../auth/services/auth.service';
import { MessagesTypes } from '../../shared/enums/enums';
import {
  createGroup,
  createGroupSuccess,
  deleteGroup,
  deleteGroupSuccess,
  empty,
  errorMessage,
  getListOfGroup,
  getListOfGroupSuccess,
} from './chat.actions';

@Injectable()
export class ChatEffects {
  private readonly actions$ = inject(Actions);

  private readonly chatService = inject(ChatService);

  private readonly authService = inject(AuthService);

  private dialog = inject(MatDialog);

  getGroupList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getListOfGroup),
      mergeMap(() => this.chatService.getListOfGroup()
        .pipe(
          map((data) => {
            return getListOfGroupSuccess({ data });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(errorMessage(
              { errorMessage: errorResponse.error.message, resulttype: MessagesTypes.FAILED },
            ));
          }),
        )),
    );
  });

  createGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createGroup),
      switchMap((action) => this.chatService.createGroup(action.name)
        .pipe(
          map((group) => {
            this.dialog.closeAll();
            return createGroupSuccess({ groupID: group.groupID, errorMessage: 'Successful created', resulttype: MessagesTypes.SUCCESS });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(errorMessage(
              { errorMessage: errorResponse.error.message, resulttype: MessagesTypes.FAILED },
            ));
          }),
        )),
    );
  });

  deleteGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteGroup),
      switchMap((action) => this.chatService.deleteGroup(action.groupID)
        .pipe(
          map(() => {
            this.dialog.closeAll();
            return deleteGroupSuccess({ errorMessage: 'Successful deleted', resulttype: MessagesTypes.SUCCESS });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(errorMessage(
              { errorMessage: errorResponse.error.message, resulttype: MessagesTypes.FAILED },
            ));
          }),
        )),
    );
  });

  showErrorMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(errorMessage),
      switchMap((action) => {
        return this.authService.openSnackBar(action.errorMessage, action.resulttype)
          .afterDismissed()
          .pipe(
            map(() => {
              return empty();
            }),
          );
      }),
    );
  });

  showSuccessMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createGroupSuccess),
      switchMap((action) => {
        return this.authService.openSnackBar(action.errorMessage, action.resulttype)
          .afterDismissed()
          .pipe(
            map(() => {
              return empty();
            }),
          );
      }),
    );
  });

  showSuccessDeleteMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteGroupSuccess),
      switchMap((action) => {
        return this.authService.openSnackBar(action.errorMessage, action.resulttype)
          .afterDismissed()
          .pipe(
            map(() => {
              return empty();
            }),
          );
      }),
    );
  });
}
