import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(
    message: string,
    action: string = 'Dismiss',
    duration: number = 3000
  ): void {
    const config: MatSnackBarConfig = {
      duration,
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    };
    this.snackBar.open(message, action, config);
  }

  showError(
    message: string,
    action: string = 'Dismiss',
    duration: number = 5000
  ): void {
    const config: MatSnackBarConfig = {
      duration,
      verticalPosition: 'top',
      panelClass: ['snackbar-error'],
    };
    this.snackBar.open(message, action, config);
  }
}
