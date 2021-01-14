import { ErrorDialogComponent } from '../app-common/components/error-dialog/error-dialog.component';
import { ErrorHandler, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandlerService implements ErrorHandler{

  constructor(
    private dialog: MatDialog
  ) { }

  handleError(): void {
    const status = 'UnExpected Error';
    const message = 'Something Went Wrong. Please Try Again Later';
    this.dialog.open(ErrorDialogComponent, {data: {
      status, message
    }});
  }

}
