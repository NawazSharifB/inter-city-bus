import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  fetchUser(uid: string): Observable<any> {
    return this.http.get(`${environment.adminServerUrl}fetch-user/${uid}`);
  }

  createNewAdmin(uid: string): Observable<any> {
    return this.http.get(`${environment.adminServerUrl}create-new-admin/${uid}`);
  }
  // validateBusUser(info): Observable<any> {
  //   return this.http.post(`${environment.adminServerUrl}validate-bus-user`, info);
  // }
  addNewBusBrand(info): Observable<any> {
    return this.http.post(`${environment.adminServerUrl}add-new-bus-brand`, info);
  }
  allBusList(): Observable<any> {
    return this.http.get(`${environment.adminServerUrl}all-bus-list`);
  }

  validateBusBrandAndUser(info: {brandName: string, userUid: string}): Observable<any> {
    return this.http.post(`${environment.adminServerUrl}validate-bus-existance`, info);
  }

  // add-new-bus-brand

}
