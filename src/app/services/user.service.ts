import { NotificationService } from './notification.service';
import { SearchDataModel } from '../models/search-info.model';
import { LoginInfoModel } from './../models/login-info.model';
import { environment } from './../../environments/environment';
import { RegisterInfoModel } from './../models/register-info.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { PurchaseTicketModel } from '../models/purchase-ticket.mode';
import { catchError, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../app-common/components/error-dialog/error-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  searchInfo = new Subject<SearchDataModel | null>();
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}


  getTravelPoints(): Observable<any> {
    return this.http.get(`${environment.userServerUrl}travel-points`);
  }

  registerUser(info: RegisterInfoModel): Observable<any> {
    return this.http.post(`${environment.userServerUrl}register`, info);
  }

  loginUser(info: LoginInfoModel): Observable<any> {
    return this.http.post(`${environment.userServerUrl}login`, info);
  }

  searchBus(info: SearchDataModel): Observable<any> {
    // console.log('search bus got called');
    return this.http.post(`${environment.userServerUrl}search`, info);
  }

  purchaseTicket(info: PurchaseTicketModel): Observable<any> {
    return this.http.post(`${environment.userServerUrl}purchase-ticket`, info);
  }

  purchasedTicketHistory(): Observable<any> {
    return this.http.get(`${environment.userServerUrl}purchased-ticket-info`);
  }

  deleteBackDatedTicketHistory(): Observable<any> {
    return this.http.delete(`${environment.userServerUrl}delete-backdated-ticket-history`);
  }

}
