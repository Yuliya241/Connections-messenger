import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { signUp } from 'src/app/store/auth-store/actions';
import { selectEmails, selectLoaded, selectLoading, selectSignUpError } from 'src/app/store/auth-store/selectors';

import { emailValidator } from '../../email-validator';
import { passwordStrengthValidator } from '../../password-validator';

@Component({
  selector: 'app-auth',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  isSubmitted = false;

  isEmailExist = false;

  emailSignUp$: Observable<string[]> = this.store.select(selectEmails);

  nameRegex = /^[A-Za-z\s]*$/;

  formSignUp = this.fb.group({
    name: ['', { nonNullable: true, validators: [Validators.required, Validators.maxLength(40), Validators.pattern(this.nameRegex)] }],
    email: ['', [Validators.required, Validators.email], emailValidator(this.emailSignUp$)],
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

  get name() {
    return this.formSignUp.controls.name;
  }

  get email() {
    return this.formSignUp.controls.email;
  }

  get password() {
    return this.formSignUp.controls.password;
  }

  public onSubmit(): void {
    if (this.formSignUp.valid) {
      this.store.dispatch(signUp(
        {
          email: this.formSignUp.value.email || '',
          name: this.formSignUp.value.name || '',
          password: this.formSignUp.value.password || '',
        },
      ));
    }

    if (this.errorMessage$ && this.emailSignUp$) {
      this.isEmailExist = true;
    }

    const emailControlValue = this.formSignUp.get('email');
    if (emailControlValue) {
      emailControlValue.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.isEmailExist = false;
      });
    }
    this.isSubmitted = true;
  }
}
