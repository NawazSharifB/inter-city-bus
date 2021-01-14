import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from './../../../services/auth.service';
import { ErrorService } from './../../../services/error.service';
import { NotificationService } from './../../../services/notification.service';
import { BusProprietorService } from './../../../services/bus-proprietor.service';
import { FullBusInfoModel } from './../../../models/full-bus-info.model';
// import { AuthService } from 'src/app/services/auth.service';
// import { ErrorService } from './../../services/error.service';
// import { NotificationService } from './../../services/notification.service';
// import { BusProprietorService } from './../../services/bus-proprietor.service';
// import { FullBusInfoModel } from 'src/app/models/full-bus-info.model';

@Component({
  selector: 'app-proprietor-all-bus-list',
  templateUrl: './proprietor-all-bus-list.component.html',
  styleUrls: ['./proprietor-all-bus-list.component.scss']
})
export class ProprietorAllBusListComponent implements OnInit {

  busList: FullBusInfoModel[];
  busName: string;
  busTitleName: string;
  constructor(
    private busProprietorService: BusProprietorService,
    private router: Router,
    private notificationService: NotificationService,
    private errorService: ErrorService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.busTitleName = this.authService.userProprietoryBusName();
    this.busName = this.busTitleName.split(' ').join('_');
    this.allBusList();
  }

  allBusList(): void {
    this.notificationService.pageBlocker.next(true);
    this.busProprietorService.allBusList()
      .subscribe(data => {
        this.notificationService.pageBlocker.next(false);
        // console.log(data);
        this.busList = data;
      }, (error: HttpErrorResponse) => {
        // console.log(error);
        this.notificationService.pageBlocker.next(false);
        if (error.status === 403) {
          this.errorService.forBidden();
          this.router.navigate(['/login']);
        } else if (error.status === 401) {
          this.errorService.unAuthorized();
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/proprietor/panel']);
          throw error;
        }
      });
  }

  editBus(id: string): void {
    // console.log(id);
    this.router.navigate(['/proprietor', this.busName, 'edit-bus', id]);
  }

  deleteBus(id: string): void {
    // console.log(id);
    alert('Deleting Bus Is Unavailable For Now');
  }

}
