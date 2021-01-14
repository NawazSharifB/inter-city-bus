import { Component, OnDestroy, OnInit, Output, ViewChildren, EventEmitter } from '@angular/core';
import { QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatExpansionPanel } from '@angular/material/expansion';

import { AuthService } from './../../../services/auth.service';
import { NotificationService } from './../../../services/notification.service';
import { UserService } from './../../../services/user.service';
import { SearchBusListModel } from './../../../models/search-bus-list.model';
// import { AuthService } from './../../services/auth.service';
// import { NotificationService } from './../../services/notification.service';
// import { MatExpansionPanel } from '@angular/material/expansion';
// import { UserService } from './../../services/user.service';
// import { SearchBusListModel } from 'src/app/models/search-bus-list.model';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.scss']
})
export class BusListComponent implements OnInit, OnDestroy {

  busList = [];
  journeyDate: number;
  unFilteredBusList: SearchBusListModel[];
  busDetail;
  searchInfo$: Subscription;
  @ViewChildren('ee') expansionPanel: QueryList<MatExpansionPanel>;
  constructor(
    private userService: UserService,
    private notficationService: NotificationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.searchInfo$ = this.userService.searchInfo.pipe(
      switchMap( searchInfo => {
        this.notficationService.pageBlocker.next(true);
        if (searchInfo) {
          this.journeyDate = searchInfo.date;
          // console.log('from bus list');
          return this.userService.searchBus(searchInfo);
        } else {
          // console.log('null');
        }
      })
    ).subscribe(buses => {
      setTimeout(() => {
        this.notficationService.pageBlocker.next(false);
      }, 500);
      this.unFilteredBusList = buses;
      // console.log(buses);
    }, error => {
      this.notficationService.pageBlocker.next(false);
      throw error;
    });

  }


  fiteredBusList(busList): void {
    this.busList = busList;
  }

  selectedBus(bus, i): void {
    if (!this.authService.isUserLoggedIn()) {
      this.notficationService.sideLogin.next(true);
      return;
    }
    const arr = Array.from(this.expansionPanel);
    arr.forEach(e => {
      e.close();
    });
    arr[i].open();
  }

  close(): void {
    const arr = Array.from(this.expansionPanel);
    arr.forEach(e => {
      e.close();
    });
  }


  ngOnDestroy(): void {
    this.searchInfo$.unsubscribe();
  }

}
