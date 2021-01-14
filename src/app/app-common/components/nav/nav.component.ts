import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../../services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { combineLatest, merge, Observable } from 'rxjs';
import { combineAll, map, shareReplay } from 'rxjs/operators';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  loggedIn = false;
  proprietor = false;
  admin = false;
  busName: string = null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private router: Router
  ) {}


  ngOnInit(): void {
    combineLatest([this.authService.isUserLoggedIn$, this.authService.isUserProprietor$, this.authService.isUserAdmin$])
      .subscribe(data => {
        setTimeout(() => {

          this.loggedIn = data[0];
          this.proprietor = data[1];
          this.admin = data[2];

          if (this.proprietor) {
            this.busName = this.authService.userProprietoryBusName().split(' ').join('_');
          } else {
            this.busName = null;
          }
        });
      });
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
