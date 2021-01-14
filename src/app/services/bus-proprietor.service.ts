import { tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { AddBusInfoModel } from './../models/add-bus-info.mode';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusProprietorService {

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) { }

  fetchUser(uid: string): Observable<any> {
    return this.http.get(`${environment.proprietorServerUrl}fetch-user/${uid}`);
  }

  addBus(info: AddBusInfoModel): Observable<any> {
    return this.http.post(`${environment.proprietorServerUrl}add-bus`, info).pipe(
      tap(x => this.notificationService.successful(x.message, 'cancel'))
    );
  }

  getEditBusInfo(id: string): Observable<any> {
    return this.http.get(`${environment.proprietorServerUrl}get-edit-bus-info/${id}`);
  }

  editInfo(info): Observable<any> {
    return this.http.post(`${environment.proprietorServerUrl}edit-bus-info`, info).pipe(
      tap(x => this.notificationService.successful(x.message, 'cancel'))
    );
  }

  addNewModerator(id: string): Observable<any> {
    return this.http.get(`${environment.proprietorServerUrl}create-new-moderator/${id}`);
  }

  allBusList(): Observable<any> {
    return this.http.get(`${environment.proprietorServerUrl}all-bus-list`);
  }

  // create-new-moderator
}
