import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { signIn } from 'src/app/store/auth-store/actions';
import { selectLoaded, selectLoading, selectSignUpError } from 'src/app/store/auth-store/selectors';

import { passwordStrengthValidator } from '../../password-validator';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  isSubmitted = false;

  isDataExist = false;

  formSignIn = this.fb.group({
    email: ['', { nonNullable: true, validators: [Validators.required, Validators.email] }],
    password: ['', Validators.compose([
      Validators.required, passwordStrengthValidator(/\d/, { hasNumber: true }),
      passwordStrengthValidator(/[A-Z]/, { hasUpperCase: true }),
      passwordStrengthValidator(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/, { hasSpecialCharacters: true }),
      Validators.minLength(8)]),
    ],
  });

  loading$: Observable<boolean> = this.store.select(selectLoading);

  loaded$: Observable<boolean> = this.store.select(selectLoaded);

  errorMessage$: Observable<string> = this.store.select(selectSignUpError);

  constructor(private fb: FormBuilder, private store: Store, private destroyRef: DestroyRef) { }

  get email() {
    return this.formSignIn.controls.email;
  }

  get password() {
    return this.formSignIn.controls.password;
  }

  public onSubmit(): void {
    if (this.formSignIn.valid) {
      this.store.dispatch(signIn(
        {
          email: this.formSignIn.value.email || '',
          password: this.formSignIn.value.password || '',
        },
      ));
    }

    if (this.errorMessage$) {
      this.isDataExist = true;
    }

    const emailControlValue = this.formSignIn.get('email');
    const passwordControlValue = this.formSignIn.get('password');

    if (emailControlValue && passwordControlValue) {
      emailControlValue.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.isDataExist = false;
      });
      passwordControlValue.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.isDataExist = false;
      });
    }
    this.isSubmitted = true;
  }
}
