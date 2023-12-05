import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { logout } from 'src/app/store/auth-store/actions';
import { selectLoading } from 'src/app/store/auth-store/selectors';

import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);

  private destroyRef = inject(DestroyRef);

  private localStorage = inject(LocalStorageService);

  public router = inject(Router);

  private store = inject(Store);

  iconName = '';

  loading$: Observable<boolean> = this.store.select(selectLoading);

  ngOnInit(): void {
    this.authService.logout$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((buttonLogout) => { this.iconName = buttonLogout; });

    const iconValue = this.localStorage.getIconLogout();
    if (iconValue) {
      this.iconName = iconValue;
    }
  }

  public logoutForm(): void {
    this.store.dispatch(logout());
  }
}
