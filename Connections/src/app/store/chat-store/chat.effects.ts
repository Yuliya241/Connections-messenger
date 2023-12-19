import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { ChatService } from 'src/app/conversations/services/chat.service';

import { AuthService } from '../../auth/services/auth.service';
import { MessagesTypes } from '../../shared/enums/enums';
import {
  createConversation,
  createConversationSuccess,
  createGroup,
  createGroupSuccess,
  deleteDialog,
  deleteDialogSuccess,
  deleteGroup,
  deleteGroupSuccess,
  empty,
  errorMessage,
  getConversationList,
  getConversationListSuccess,
  getDialogfMessagesSuccess,
  getDialogMessages,
  getLastMessages,
  getLastMessagesSuccess,
  getListOfGroup,
  getListOfGroupSuccess,
  getListOfMessages,
  getListOfMessagesSuccess,
  getListOfPeople,
  getListOfPeopleSuccess,
  sendDialogMessages,
  sendDialogMessagesSuccess,
  sendMessages,
  sendMessagesSuccess,
  updateDialogMessages,
  updateDialogMessagesSuccess,
} from './chat.actions';

@Injectable()
export class ChatEffects {
  private readonly actions$ = inject(Actions);

  private readonly chatService = inject(ChatService);

  private readonly authService = inject(AuthService);

  private dialog = inject(MatDialog);

  private router = inject(Router);

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
            return createGroupSuccess({ groupID: group.groupID || '', errorMessage: 'Group successful created', resulttype: MessagesTypes.SUCCESS });
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
            return deleteGroupSuccess({ errorMessage: 'Group is successfully deleted', resulttype: MessagesTypes.SUCCESS });
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

  showSuccessDeleteDialogMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteDialogSuccess),
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

  showCreateConversationSuccessMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createConversationSuccess),
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

  getPeopleList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getListOfPeople),
      mergeMap(() => this.chatService.getListOfPeople()
        .pipe(
          map((data) => {
            return getListOfPeopleSuccess({ data });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(errorMessage(
              { errorMessage: errorResponse.error.message, resulttype: MessagesTypes.FAILED },
            ));
          }),
        )),
    );
  });

  createConversation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createConversation),
      switchMap((action) => this.chatService.createConversation(action.companion)
        .pipe(
          map((person) => {
            return createConversationSuccess({ conversationID: person.conversationID, errorMessage: 'Successful created', resulttype: MessagesTypes.SUCCESS });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(errorMessage(
              { errorMessage: errorResponse.error.message, resulttype: MessagesTypes.FAILED },
            ));
          }),
        )),
    );
  });

  createConversationSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createConversationSuccess),
      tap((action) => {
        const id = action.conversationID;
        this.router.navigate(['main/conversation/', id]);
      }),
    );
  }, { dispatch: false });

  getConversationList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getConversationList),
      mergeMap(() => this.chatService.getActiveConversations()
        .pipe(
          map((data) => {
            return getConversationListSuccess({ data });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(errorMessage(
              { errorMessage: errorResponse.error.message, resulttype: MessagesTypes.FAILED },
            ));
          }),
        )),
    );
  });

  getMessagesList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getListOfMessages),
      switchMap((action) => this.chatService.getMessages(action.groupID)
        .pipe(
          map((data) => {
            return getListOfMessagesSuccess({ data });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(errorMessage(
              { errorMessage: errorResponse.error.message, resulttype: MessagesTypes.FAILED },
            ));
          }),
        )),
    );
  });

  getMessagesLast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLastMessages),
      switchMap((action) => this.chatService.getLastMessages(action.groupID, action.since)
        .pipe(
          map(() => {
            return getLastMessagesSuccess();
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(errorMessage(
              { errorMessage: errorResponse.error.message, resulttype: MessagesTypes.FAILED },
            ));
          }),
        )),
    );
  });

  sendMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendMessages),
      switchMap((action) => this.chatService.sendMessage(action.groupID, action.message)
        .pipe(
          map(() => {
            return sendMessagesSuccess({ errorMessage: 'Message is sent', resulttype: MessagesTypes.SUCCESS });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(errorMessage(
              { errorMessage: errorResponse.error.message, resulttype: MessagesTypes.FAILED },
            ));
          }),
        )),
    );
  });

  showSendMessageSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendMessagesSuccess),
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

  deleteDialog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteDialog),
      switchMap((action) => this.chatService.deleteConversation(action.conversationID)
        .pipe(
          map(() => {
            this.dialog.closeAll();
            return deleteDialogSuccess({ errorMessage: 'Conversation is successfully deleted', resulttype: MessagesTypes.SUCCESS });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(errorMessage(
              { errorMessage: errorResponse.error.message, resulttype: MessagesTypes.FAILED },
            ));
          }),
        )),
    );
  });

  sendDialogMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendDialogMessages),
      switchMap((action) => this.chatService
        .sendDialogMessage(action.conversationID, action.message)
        .pipe(
          map(() => {
            return sendDialogMessagesSuccess({ errorMessage: 'Message is sent', resulttype: MessagesTypes.SUCCESS });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(errorMessage(
              { errorMessage: errorResponse.error.message, resulttype: MessagesTypes.FAILED },
            ));
          }),
        )),
    );
  });

  showSendDialogMessageSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendDialogMessagesSuccess),
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

  getDialogMessages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getDialogMessages),
      switchMap((action) => this.chatService.getConversationMessages(action.conversationID)
        .pipe(
          map((data) => {
            return getDialogfMessagesSuccess({ data });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(errorMessage(
              { errorMessage: errorResponse.error.message, resulttype: MessagesTypes.FAILED },
            ));
          }),
        )),
    );
  });

  updateDialogMessages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateDialogMessages),
      switchMap((action) => this.chatService
        .updateConversationMessages(action.conversationID, action.since)
        .pipe(
          map(() => {
            return updateDialogMessagesSuccess();
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(errorMessage(
              { errorMessage: errorResponse.error.message, resulttype: MessagesTypes.FAILED },
            ));
          }),
        )),
    );
  });
}
