import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const today: Date = new Date();

    return (new Date(control.value) > today) ? { notInFuture: true } : null;
  };
}
