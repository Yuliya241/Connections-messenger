import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { map, Observable, take } from 'rxjs';

export function emailValidator(emailSignUp$: Observable<string[]>): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return emailSignUp$.pipe(
      map((email) => {
        const { value } = control;
        return email.includes(value) ? { emailExistant: true } : null;
      }),
      take(1),
    );
  };
}
