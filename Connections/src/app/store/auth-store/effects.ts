import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';

import { AuthService } from '../../auth/services/auth.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { LocalStorageKeys, MessagesTypes } from '../../shared/enums/enums';
import {
  authActionsSuccess,
  empty,
  errorMessage,
  getProfile,
  logout,
  setUser,
  signIn,
  signUp,
  updateUser,
  updateUserSuccess,
} from './actions';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);

  private readonly router = inject(Router);

  private readonly store = inject(Store);

  private readonly authService = inject(AuthService);

  private localStorage = inject(LocalStorageService);

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUp),
      switchMap((action) => this.authService.register(
        {
          name: action.name,
          email: action.email,
          password: action.password,
        },
      ).pipe(
        map((data) => {
          this.router.navigate(['signin']);
          return authActionsSuccess({ data, errorMessage: 'Registration successful', resulttype: MessagesTypes.SUCCESS });
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(errorMessage(
            { errorMessage: errorResponse.error.message, resulttype: MessagesTypes.FAILED },
          ));
        }),
      )),
    );
  });

  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signIn),
      switchMap((action) => this.authService.login(
        {
          email: action.email,
          password: action.password,
        },
      ).pipe(
        tap(() => this.localStorage.setItem(LocalStorageKeys.EMAIL, action.email)),
        map((data) => {
          this.localStorage.setItem(LocalStorageKeys.TOKEN, data.token);
          this.localStorage.setItem(LocalStorageKeys.UID, data.uid);
          this.localStorage.setItem(LocalStorageKeys.BUTTON, 'input');
          this.router.navigate(['main']);
          return authActionsSuccess({ data, errorMessage: 'Login successful', resulttype: MessagesTypes.SUCCESS });
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
      ofType(authActionsSuccess),
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

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),
      switchMap(() => this.authService.logout().pipe(
        map((data) => {
          this.localStorage.removeItemToken();
          this.localStorage.removeItemEmail();
          this.localStorage.removeItemUid();
          this.localStorage.removeIconLogout();
          this.router.navigate(['signin']);
          return authActionsSuccess({ data, errorMessage: 'Logout successful', resulttype: MessagesTypes.SUCCESS });
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(errorMessage(
            { errorMessage: errorResponse.error.message, resulttype: MessagesTypes.FAILED },
          ));
        }),
      )),
    );
  });

  getProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getProfile),
      mergeMap(() => this.authService.profile()
        .pipe(
          map((user) => {
            return setUser({ data: user });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(errorMessage(
              { errorMessage: errorResponse.error.message, resulttype: MessagesTypes.FAILED },
            ));
          }),
        )),
    );
  });

  updateProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUser),
      switchMap((action) => this.authService.updateProfile(action.name)
        .pipe(
          map(() => {
            return updateUserSuccess();
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
