import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { NotificationService } from './../../../services/notification.service';
import { AdminService } from './../../../services/admin.service';
import { ErrorService } from './../../../services/error.service';
// import { ErrorService } from './../../services/error.service';
// import { HttpErrorResponse } from '@angular/common/http';
// import { NotificationService } from './../../services/notification.service';
// import { AdminService } from './../../services/admin.service';
// import { AdminService } from 'src/app/services/admin.service';
// import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-new-bus-brand',
  templateUrl: './add-new-bus-brand.component.html',
  styleUrls: ['./add-new-bus-brand.component.scss']
})
export class AddNewBusBrandComponent implements OnInit {

  userInfo;
  busInfoForm: FormGroup;
  busBrandNameAvailable = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private notificationService: NotificationService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.busInfoForm = this.fb.group({
      brandName: [null, [Validators.required]],
      userUid: [null, [Validators.required]]
    });

  }

  validate(): void {
    this.notificationService.pageBlocker.next(true);

    this.adminService.validateBusBrandAndUser(this.busInfoForm.value)
      .subscribe(data => {
        this.notificationService.pageBlocker.next(false);
        if (!data.busNameAvailable) {
          this.busInfoForm.get('brandName').setErrors({alreadyExists: 'Bus Brand Already Exists'});
          this.busBrandNameAvailable = false;
        } else {
          this.busBrandNameAvailable = true;
        }
        if (!data.userInfo) {
          this.busInfoForm.get('userUid').setErrors({notFound: 'User Not Found'});
        } else {
          this.userInfo = data.userInfo;
          if (this.userInfo.role !== 'user') {
            this.busInfoForm.get('userUid').setErrors({unAvailable: 'User Can\'t Be Admin For This Bus'});
          }
        }
        // console.log(data);
      }, error => {
        this.notificationService.pageBlocker.next(false);
        throw error;
      });
  }

  enhanceBusName(): void {
    const control: AbstractControl = this.busInfoForm.get('brandName');
    if (control.value) {
      const value = (control.value as string).replace(/\s+/g, ' ').trim().split(' ').map( word => {
        return word.charAt(0).toUpperCase() + word.slice(1, word.length).toLowerCase();
      }).join(' ');
      // console.log(value);
      control.setValue(value, {emitEvent: false});
    }
  }

  enhanceUid(): void {
    this.busInfoForm.get('userUid').setValue(this.busInfoForm.get('userUid').value.trim(), {emitEvent: false});
  }

  submit(): void {
    if (!this.busBrandNameAvailable || this.userInfo.role !== 'user') {
      return;
    }
    this.notificationService.pageBlocker.next(true);
    this.adminService.addNewBusBrand(this.busInfoForm.value)
      .subscribe( data => {
        this.busInfoForm.reset();
        this.notificationService.pageBlocker.next(false);
        this.notificationService.successful(data.message, 'cancel');
        // console.log('blah blah blah', data);
      }, (error: HttpErrorResponse) => {
        this.notificationService.pageBlocker.next(false);
        // console.log(error);
        if (error.status === 400) {
          return this.errorService.badRequest(error.message);
        }
        throw error;
      });
  }


}
