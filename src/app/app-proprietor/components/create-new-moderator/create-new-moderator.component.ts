import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { BusProprietorService } from './../../../services/bus-proprietor.service';
import { AdminService } from './../../../services/admin.service';
import { GeneralUserInfoModel } from './../../../models/general-user-info';
// import { GeneralUserInfoModel } from 'src/app/models/general-user-info';
// import { AdminService } from 'src/app/services/admin.service';
// import { BusProprietorService } from 'src/app/services/bus-proprietor.service';

@Component({
  selector: 'app-create-new-moderator',
  templateUrl: './create-new-moderator.component.html',
  styleUrls: ['./create-new-moderator.component.scss']
})
export class CreateNewModeratorComponent implements OnInit {

  uid = new FormControl(null, [Validators.required]);
  userInfo: GeneralUserInfoModel;

  constructor(
    private adminService: AdminService,
    private proprietorService: BusProprietorService
  ) { }

  ngOnInit(): void {
  }

  searchUser(): void {
    // console.log(this.uid.value);
    this.proprietorService.fetchUser(this.uid.value)
      .subscribe( data => {
        // console.log(data);
        this.userInfo = data;
      }, error => {
        // console.log(error);
      });
}

createModerator(): void {
  if (this.uid.invalid) {
    return;
  }

  this.proprietorService.addNewModerator(this.userInfo.uid)
    .subscribe( data => {
      // console.log(data);
    }, error => {
      // console.log(error);
    });
}

}
