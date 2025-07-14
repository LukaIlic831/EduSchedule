import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notZeroOrNullValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return value === null || value === 0 ? { invalidSelection: true } : null;
  };
}
