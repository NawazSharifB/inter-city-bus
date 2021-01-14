import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../app-common/components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  forBidden(): void {
    // this.authService.logout();
    this.dialog.open(ErrorDialogComponent, {data: {status: 'Forbidden Request', message: 'ForBidden Request. Please Login With Different Account'}});
  }

  unAuthorized(): void {
    this.dialog.open(ErrorDialogComponent, {data: {status: 'Unauthorized Request', message: 'Unauthorized Request. Please Try Again'}});
  }
  badRequest(message?: string): void {
    this.dialog.open(ErrorDialogComponent, {data: {status: 'Bad Request', message: message || 'Unauthorized Request. Please Try Again'}});
  }
}
