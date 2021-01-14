import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AdminService } from './../../../services/admin.service';
import { GeneralUserInfoModel } from 'src/app/models/general-user-info';
// import { AdminService } from './../../services/admin.service';
// import { GeneralUserInfoModel } from '../../models/general-user-info';

@Component({
  selector: 'app-create-new-admin',
  templateUrl: './create-new-admin.component.html',
  styleUrls: ['./create-new-admin.component.scss']
})
export class CreateNewAdminComponent implements OnInit {

  uid = new FormControl(null, [Validators.required]);
  userInfo: GeneralUserInfoModel;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
  }

  searchUser(): void {
      // console.log(this.uid.value);
      this.adminService.fetchUser(this.uid.value)
        .subscribe( data => {
          // console.log(data);
          this.userInfo = data;
        }, error => {
          // console.log(error);
        });
  }

  createAdmin(): void {
    if (this.uid.invalid) {
      return;
    }

    this.adminService.createNewAdmin(this.userInfo.uid)
      .subscribe( data => {
        // console.log(data);
      }, error => {
        // console.log(error);
      });
  }

}
