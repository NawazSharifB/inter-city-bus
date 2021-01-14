import { NotificationService } from './../notification.service';
import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusStopNameResolverService implements Resolve<{travelPoints: string[]}> {

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.notificationService.pageBlocker.next(true);
    // console.log('bus stop name resolver got hit');
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.userService.getTravelPoints().pipe(
      catchError(error => {
        this.notificationService.pageBlocker.next(false);
        return throwError(error);
      })
    );
  }

}
