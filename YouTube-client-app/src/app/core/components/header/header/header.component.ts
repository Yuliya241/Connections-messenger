import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../../../../auth/services/auth.service';
import { fetchVideos } from '../../../../redux/actions/videos.actions';
import { YoutubeService } from '../../../../youtube/services/youtube.service';
import { LoginComponent } from './login/login.component';
import { LogoComponent } from './logo/logo.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { SettingsButtonComponent } from './settings-button/settings-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LogoComponent,
    SearchInputComponent,
    SettingsButtonComponent,
    LoginComponent,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private youtubeService: YoutubeService,
    private authService: AuthService,
    private readonly store: Store,
    private router: Router,
  ) { }

  public searchVideos(text: string) {
    this.store.dispatch(fetchVideos({ searchTerm: text }));
  }

  public showFilterButtons(): void {
    this.youtubeService.showFilterBlock();
  }

  public logoutForm(): void {
    this.authService.logout();
  }

  public toAdmin(): void {
    this.authService.goToAdmin();
  }

  public toFavouritePage() {
    this.router.navigateByUrl('favorite');
  }
}
