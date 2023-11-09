import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '';

    if (!value) {
      return null;
    }

    const upperCaseCharacters = /[A-Z]+/.test(value);

    const lowerCaseCharacters = /[a-z]+/.test(value);

    const numbers = /[0-9]+/.test(value);

    const specialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value);

    const passwordValid = upperCaseCharacters && lowerCaseCharacters && numbers && specialCharacter;

    return !passwordValid ? { passwordStrength: true } : null;
  };
}
