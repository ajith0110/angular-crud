import { Directive, Input } from '@angular/core';

import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector: '[appDisableWeekend]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DisableWeekendDirective,
      multi: true,
    },
  ],
})
export class DisableWeekendDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);

    // Check if the selected day is a weekend (Saturday or Sunday)
    if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
      return { weekendDisabled: true };
    }

    return null;
  }
}
