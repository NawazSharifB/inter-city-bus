import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { NotificationService } from './services/notification.service';
import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'inter-city-bus';
  pageBlocker = false;
  sideLogin = false;
  pageBlocker$ = Subscription;
  sideLogin$ = Subscription;
  constructor(
    private mediaObserver: MediaObserver,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.initialUserAuthStatus();
    this.mediaObserver.asObservable().subscribe( (change: MediaChange[]) => {
      // console.log(change[0].mqAlias);
    });

    this.notificationService.pageBlocker.subscribe(data => {
      setTimeout(() => {
        this.pageBlocker = data;
      });
    });
    this.notificationService.sideLogin.subscribe(data => {
      setTimeout(() => {
        this.sideLogin = data;
      });
    });
  }


  closeSideLoginArea(): void {
    this.notificationService.sideLogin.next(false);
    this.notificationService.pageBlocker.next(false);
  }






}
