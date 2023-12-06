import { CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { LocalStorageKeys } from 'src/app/shared/enums/enums';
import { getProfile } from 'src/app/store/auth-store/actions';
import { selectProfileLoaded } from 'src/app/store/auth-store/selectors';

import { LocalStorageService } from '../../services/local-storage.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, LoginComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isDark = signal<boolean>(
    JSON.parse(this.localStorage.getIsDarkTheme() ?? 'false'),
  );

  constructor(
    private localStorage: LocalStorageService,
    private store: Store,
    private router: Router,
    private destroyRef: DestroyRef,
  ) {
    effect(() => {
      this.localStorage.setItem(LocalStorageKeys.ISDARK, JSON.stringify(this.isDark()));
    });

    if (this.localStorage.getIsDarkTheme() === 'true') document.body.classList.add('dark');
  }

  public switchTheme(): void {
    document.body.classList.toggle('dark');
    this.isDark.set(!this.isDark());
  }

  public goToProfile() {
    this.router.navigate(['profile']);
    this.store.select(selectProfileLoaded)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe((isProfileLoaded) => {
        if (!isProfileLoaded) {
          this.store.dispatch(getProfile());
        }
      });
  }
}
