import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) { }

  login(): void {
    localStorage.setItem('login', 'true');
    this.router.navigate(['main']);
  }

  logout(): void {
    localStorage.removeItem('login');
    this.router.navigate(['login']);
  }
}
