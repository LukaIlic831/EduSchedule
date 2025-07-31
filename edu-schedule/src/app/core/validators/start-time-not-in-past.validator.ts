import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {
  combineDateAndTime,
  isSelectedDateCurrentDate,
} from '../utils/date-time.utils';

export function startTimeNotInPastValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const classDate = group.get('classDate')?.value;
    const startTime = group.get('startTime')?.value;
    const currentDate = new Date();

    if (!classDate || !startTime) {
      return null;
    }

    const selectedDate = new Date(classDate);
    const selectedTime = new Date(startTime);

    const combinedStartDateAndTime = combineDateAndTime(
      selectedDate,
      selectedTime
    );

    if (
      isSelectedDateCurrentDate(selectedDate, currentDate) &&
      combinedStartDateAndTime < currentDate
    ) {
      return { startTimeInPast: true };
    }

    return null;
  };
}
