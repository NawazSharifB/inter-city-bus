import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorService } from './../../../services/error.service';
import { NotificationService } from './../../../services/notification.service';
import { AuthService } from './../../../services/auth.service';
import { UserService } from './../../../services/user.service';
// import { ErrorService } from './../../services/error.service';
// import { NotificationService } from './../../services/notification.service';
// import { AuthService } from 'src/app/services/auth.service';
// import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginError = false;
  invalidForm = false;
  hidePasswordField = true;
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }


  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  // for development only
  // login() {
  //   console.log(this.email);
  //   console.log(this.password);
  // }

  login(): void {
    this.authService.logout();
    this.loginError = false;
    if (this.loginForm.invalid) {
      this.invalidForm = true;
      return;
    }
    this.notificationService.pageBlocker.next(true);
    this.userService.loginUser(this.loginForm.value)
      .subscribe(data => {
        this.router.navigate(['/search']);
        this.notificationService.pageBlocker.next(false);
        this.notificationService.sideLogin.next(false);
        // console.log(data);
        this.authService.saveToken(data);
      }, (error: HttpErrorResponse) => {
        this.notificationService.pageBlocker.next(false);
        // console.log('error from login', error);
        if (error.status === 401) {
          this.loginError = true;
          this.loginForm.reset();
          this.errorService.unAuthorized();
        } else {
          throw error;
        }
    });

  }

  register(): void {
    this.router.navigate(['/auth/register']);
    this.notificationService.sideLogin.next(false);
  }

}


