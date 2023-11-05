import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public formLogin!: FormGroup;

  constructor(private fb: FormBuilder, private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get login() {
    return this.formLogin.controls['login'];
  }

  get password() {
    return this.formLogin.controls['password'];
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.formLogin.valid) {
      this.authService.login();
    }
  }
}
