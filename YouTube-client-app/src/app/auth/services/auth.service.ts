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

  public loginSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public userSubject$ = new BehaviorSubject({ login: '' });

  public user$ = new BehaviorSubject<User | null>(null);

  public login(user: User): void {
    localStorage.setItem('login', 'true');
    this.loginSubject$.next(true);
    this.router.navigate(['main']);
    this.user$.next(user);
  }

  public logout(): void {
    localStorage.removeItem('login');
    this.loginSubject$.next(false);
    this.user$.next({ login: '' });
    this.router.navigate(['login']);
  }

  public goToAdmin(): void {
    this.router.navigateByUrl('admin');
  }
}
