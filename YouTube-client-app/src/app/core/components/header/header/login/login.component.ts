import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public authService = inject(AuthService);

  private loginSubject$: BehaviorSubject<boolean> = this.authService.loginSubject$;

  public loginSubject = false;

  ngOnInit(): void {
    this.loginSubject$.subscribe((loginSubject) => {
      this.loginSubject = loginSubject;
    });
  }

  public logoutForm(): void {
    this.authService.logout();
  }
}
