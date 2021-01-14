import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  pageBlocker = new BehaviorSubject<boolean>(false);
  sideLogin = new BehaviorSubject<boolean>(false);

  constructor(
    private snackbar: MatSnackBar
  ) { }

  successful(message: string, action: string): void {
    this.snackbar.open(message, action, {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
