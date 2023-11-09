import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';

import { LoginComponent } from './login/login.component';
import { LogoComponent } from './logo/logo.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { SettingsButtonComponent } from './settings-button/settings-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LogoComponent, SearchInputComponent, SettingsButtonComponent, LoginComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private youtubeService: YoutubeService, private authService: AuthService) { }

  searchResults(): void {
    this.youtubeService.showResults();
  }

  showFilterButtons(): void {
    this.youtubeService.showFilterBlock();
  }

  logoutForm(): void {
    this.authService.logout();
  }

  toAdmin() {
    this.authService.goToAdmin();
  }
}
