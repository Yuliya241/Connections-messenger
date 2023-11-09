import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { passwordStrengthValidator } from '../../password-validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  isSubmitted = false;

  formLogin = this.fb.group({
    login: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordStrengthValidator()]],
  });

  constructor(private fb: FormBuilder, private readonly authService: AuthService) { }

  get login() {
    return this.formLogin.controls.login;
  }

  get password() {
    return this.formLogin.controls.password;
  }

  onSubmit(): void {
    if (this.formLogin.valid) {
      this.authService.login();
    }
    this.isSubmitted = true;
  }
}
