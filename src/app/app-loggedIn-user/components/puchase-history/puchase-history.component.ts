import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PurchaseTicketModel } from './../../../models/purchase-ticket.mode';
import { NotificationService } from './../../../services/notification.service';
import { AuthService } from './../../../services/auth.service';
import { UserService } from './../../../services/user.service';
import { PurchasedTicketDetailComponent } from '../purchased-ticket-detail/purchased-ticket-detail.component';
// import { AuthService } from 'src/app/services/auth.service';
// import { NotificationService } from './../../services/notification.service';
// import { UserService } from 'src/app/services/user.service';
// import { NotificationService } from 'src/app/services/notification.service';
// import { PurchaseTicketModel } from 'src/app/models/purchase-ticket.mode';

@Component({
  selector: 'app-puchase-history',
  templateUrl: './puchase-history.component.html',
  styleUrls: ['./puchase-history.component.scss']
})
export class PuchaseHistoryComponent implements OnInit {

  displayedColumns = ['busName', 'from', 'to', 'date', 'journeyTime'];
  userInfo;

  // backDated: PurchaseTicketModel[] = [{
  //   busName: 'DESH TRAVELS NATIONAL',
  //   busUid: 'string',
  //   date: '31 DECEMBER, 2020',
  //   seatArray: [],
  //   journeyTime: 1230,
  //   arrivalTime: 2330,
  //   startPoint: 'Uttor kumari',
  //   endPoint: 'Khan babar dorbar',
  //   totalFare: 10000,
  //   busType: 'Non AC',
  //   busNumber: 'kham343422'
  // }];
  upcoming: PurchaseTicketModel[];
  backDated: PurchaseTicketModel[];

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private authServie: AuthService
  ) { }

  ngOnInit(): void {
    this.userInfo = this.authServie.getTokenInfo();
    this.notificationService.pageBlocker.next(true);
    this.userService.purchasedTicketHistory().subscribe( (data: PurchaseHistoryData) => {
      this.notificationService.pageBlocker.next(false);
      this.sortTickets(data);
    }, error => {
      this.notificationService.pageBlocker.next(false);
      // console.log(error);
      throw error;
    });
  }

  sortTickets(tickets: PurchaseHistoryData): void {
    this.upcoming = tickets.upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    this.backDated = tickets.backDated.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }


  ticketDetails(ticket: PurchaseTicketModel): void {
    // console.log(ticket.busUid);
    this.dialog.open(PurchasedTicketDetailComponent, {data: ticket});
  }

  deleteHistory(): void {
    let backDatedHistory = [...this.backDated];
    this.backDated = [];
    this.userService.deleteBackDatedTicketHistory().subscribe(data => {
      backDatedHistory = [];
    }, error => {
      this.backDated = backDatedHistory;
      backDatedHistory = [];
      throw error;
    });
  }

}


interface PurchaseHistoryData {
  upcoming: PurchaseTicketModel[];
   backDated: PurchaseTicketModel[];
}
