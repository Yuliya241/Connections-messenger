import { Component, EventEmitter, Output } from '@angular/core';

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
  @Output() showResults = new EventEmitter();

  @Output() showFilterBlock = new EventEmitter();

  searchResults() {
    this.showResults.emit();
  }

  showFilter() {
    this.showFilterBlock.emit();
  }
}
