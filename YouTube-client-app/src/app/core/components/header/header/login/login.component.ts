import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);

  public router = inject(Router);

  public isLoggedIn = false;

  name?: string | null = null;

  ngOnInit(): void {
    this.authService.loginSubject$.subscribe((loginSubject) => {
      this.isLoggedIn = loginSubject;
    });
    this.authService.user$.subscribe((user) => { this.name = user?.login; });
  }

  public logoutForm(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
