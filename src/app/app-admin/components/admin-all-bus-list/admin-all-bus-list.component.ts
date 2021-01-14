import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { NotificationService } from './../../../services/notification.service';
import { ErrorService } from './../../../services/error.service';
import { FullBusInfoModel } from './../../../models/full-bus-info.model';
// import { AdminService } from 'src/app/services/admin.service';
// import { NotificationService } from './../../services/notification.service';
// import { ErrorService } from './../../services/error.service';
// import { FullBusInfoModel } from './../../models/full-bus-info.model';
// import { FullBusInfoModel } from 'src/app/models/full-bus-info.model';
// import { ErrorService } from 'src/app/services/error.service';
// import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-admin-all-bus-list',
  templateUrl: './admin-all-bus-list.component.html',
  styleUrls: ['./admin-all-bus-list.component.scss']
})
export class AdminAllBusListComponent implements OnInit {

  busList: FullBusInfoModel[];
  constructor(
    private adminService: AdminService,
    private errorService: ErrorService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.allBusList();
  }

  allBusList(): void {
    this.notificationService.pageBlocker.next(true);
    this.adminService.allBusList()
      .subscribe(data => {
        this.notificationService.pageBlocker.next(false);
        // console.log(data);
        this.busList = data;
      }, (error: HttpErrorResponse) => {
        this.notificationService.pageBlocker.next(false);
        if (error.status === 403) {
          this.errorService.forBidden();
          this.router.navigate(['/login']);
        } else if (error.status === 401) {
          this.errorService.unAuthorized();
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/admin/panel']);
          throw error;
        }
      });
  }

}
