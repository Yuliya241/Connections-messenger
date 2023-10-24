import { Component } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { SettingsButtonComponent } from './settings-button/settings-button.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, SearchInputComponent, SettingsButtonComponent, LoginComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

}
