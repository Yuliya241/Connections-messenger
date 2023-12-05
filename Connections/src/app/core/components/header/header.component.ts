import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LocalStorageKeys } from 'src/app/shared/enums/enums';

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

  constructor(private localStorage: LocalStorageService) {
    effect(() => {
      this.localStorage.setItem(LocalStorageKeys.ISDARK, JSON.stringify(this.isDark()));
    });

    if (this.localStorage.getIsDarkTheme() === 'true') document.body.classList.add('dark');
  }

  public switchTheme(): void {
    document.body.classList.toggle('dark');
    this.isDark.set(!this.isDark());
  }
}
