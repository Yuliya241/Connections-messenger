import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

export interface User {
  login?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public router = inject(Router);

  private loginSource: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public loginSubject$ = this.loginSource.asObservable();

  private userSource = new BehaviorSubject<User | null>(null);

  public user$ = this.userSource.asObservable();

  public login(user: User): void {
    localStorage.setItem('login', 'true');
    this.loginSource.next(true);
    this.router.navigate(['main']);
    this.userSource.next(user);
  }

  public logout(): void {
    localStorage.removeItem('login');
    this.loginSource.next(false);
    this.userSource.next({ login: '' });
    this.router.navigate(['login']);
  }

  public goToAdmin(): void {
    this.router.navigateByUrl('admin');
  }
}
