import { Component } from '@angular/core';

import { YoutubeService } from 'src/app/youtube/services/youtube.service';

import { LoginComponent } from './login/login.component';
import { LogoComponent } from './logo/logo.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { SettingsButtonComponent } from './settings-button/settings-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, SearchInputComponent, SettingsButtonComponent, LoginComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(readonly youtubeService: YoutubeService) { }

  searchResults() {
    this.youtubeService.showResults();
  }

  showFilterButtons() {
    this.youtubeService.showFilterBlock();
  }
}
