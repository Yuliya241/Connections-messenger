import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BehaviorSubject, tap } from 'rxjs';
import { LogoutButtonTypes, MessagesTypes, SnackbarColors } from 'src/app/shared/enums/enums';
import { User, UserDetails } from 'src/app/store/auth-store/state.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private logoutSource = new BehaviorSubject<string>(LogoutButtonTypes.ACCOUNT_CIRCLE);

  public logout$ = this.logoutSource.asObservable();

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  public register(userParams: { email: string, name: string, password: string }) {
    return this.http.post<User>(environment.postRegistration, userParams);
  }

  public login(userParams: { email: string, password: string }) {
    return this.http.post<User>(environment.postLogin, userParams)
      .pipe(
        tap(() => this.logoutSource.next(LogoutButtonTypes.INPUT)),
      );
  }

  public logout() {
    return this.http.delete<User>(environment.deleteLogout)
      .pipe(
        tap(() => this.logoutSource.next(LogoutButtonTypes.ACCOUNT_CIRCLE)),
      );
  }

  public profile() {
    return this.http.get<UserDetails>(environment.getProfile);
  }

  openSnackBar(message: string, action: string) {
    return this.snackbar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 4000,
      panelClass: [(action === MessagesTypes.SUCCESS) ? SnackbarColors.GREEN : SnackbarColors.RED],
    });
  }
}
