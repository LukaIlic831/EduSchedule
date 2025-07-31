import { ClassModel } from '../../state/class/models/class.model';

export function combineDateAndTime(date: Date, time: Date): Date {
  const combinedDate = new Date(date);
  combinedDate.setHours(time.getHours(), time.getMinutes(), 0, 0);
  return combinedDate;
}

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

export function getDurationInMinutes(
  startTime: string,
  endTime: string
): number {
  const startTimeDate = new Date(startTime);
  const endTimeDate = new Date(endTime);
  return Math.floor((endTimeDate.getTime() - startTimeDate.getTime()) / 60000);
}

export function handleFormatingDateAndTime(
  loadedClass: ClassModel
): ClassModel {
  const formattedDate = new Date(loadedClass.startTime).toLocaleDateString();
  const formattedStartTime = new Date(
    loadedClass.startTime
  ).toLocaleTimeString();
  const formattedEndTime = new Date(loadedClass.endTime).toLocaleTimeString();

  return {
    ...loadedClass,
    dateAndTimeFormatted: `${formattedDate} | ${formattedStartTime} - ${formattedEndTime}`,
  };
}

export function isSelectedDateCurrentDate(
  selectedDate: Date,
  currentDate: Date
): boolean {
  return (
    selectedDate.getDate() === currentDate.getDate() &&
    selectedDate.getMonth() === currentDate.getMonth() &&
    selectedDate.getFullYear() === currentDate.getFullYear()
  );
}
