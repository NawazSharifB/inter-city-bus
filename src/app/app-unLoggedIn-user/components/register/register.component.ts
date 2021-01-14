import { Router } from '@angular/router';
import { NotificationService } from './../../../services/notification.service';
import { Component, DoCheck, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../../../services/auth.service';
import { UserService } from './../../../services/user.service';
import { PhoneValidityValidatorService } from './../../../validators/async/phone-validity-validator.service';
import { EmailValidityValidatorService } from './../../../validators/async/email-validity.validator.service';
// import { AuthService } from './../../services/auth.service';
// import { UserService } from './../../services/user.service';
// import { PasswordRePasswordValidator } from '../../validators/password-repassword.validator';
// import { EmailValidityValidatorService } from '../../validators/async/email-validity.validator.service';
// import { PhoneValidityValidatorService } from './../../validators/async/phone-validity-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, DoCheck {

  registerForm: FormGroup;
  hidePasswordField = true;
  constructor(
    private fb: FormBuilder,
    private emailValidity: EmailValidityValidatorService,
    private phoneValidity: PhoneValidityValidatorService,
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.creatForm();
  }

  ngDoCheck(): void {
    if (this.registerForm.hasError('unMatchPassword')) {
      this.password.setErrors({unMatchPassword: this.registerForm.errors.unMatchPassword});
      this.rePassword.setErrors({unMatchPassword: this.registerForm.errors.unMatchPassword});
    } else {
      this.password.updateValueAndValidity();
      this.rePassword.updateValueAndValidity();
    }
  }

  creatForm(): void {
    this.registerForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      phone: [null,
        [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
        [this.phoneValidity.checkPhoneValidity()]],
      email: [null,
        [Validators.required, Validators.email],
        [this.emailValidity.checkEmailValidity()]],
      password: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      rePassword: [null, [Validators.required]]
    }, { /*validators: [PasswordRePasswordValidator]/* /*, asyncValidators: [PasswordRePasswordValidator]*/});
  }

  get firstName(): AbstractControl {
    return this.registerForm.get('firstName');
  }
  get lastName(): AbstractControl {
    return this.registerForm.get('lastName');
  }
  get phone(): AbstractControl {
    return this.registerForm.get('phone');
  }
  get email(): AbstractControl {
    return this.registerForm.get('email');
  }
  get password(): AbstractControl {
    return this.registerForm.get('password');
  }
  get rePassword(): AbstractControl {
    return this.registerForm.get('rePassword');
  }

  enhanceInput(controlName: string): void {
    let value: string = (this[controlName] as AbstractControl).value;

    if (value) {
      value = value.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1, word.length).toLowerCase();
      }).join(' ');
    }

    (this[controlName] as AbstractControl).setValue(value);

  }

  // for testing purpose
  // register(): void {
  //   console.log(this.rePassword);
  // }

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.notificationService.pageBlocker.next(true);
    const {rePassword, ...registerInfo} = this.registerForm.value;
    this.userService.registerUser(registerInfo)
      .subscribe(data => {
        // console.log(data);
        this.notificationService.pageBlocker.next(false);
        this.notificationService.successful('Registration Successful', 'cancel');
        this.authService.saveToken(data);
        this.router.navigate(['/search']);
      }, error => {
        // console.log(error);
        this.notificationService.pageBlocker.next(false);
        throw error;
      });
    // console.log(registerInfo);
  }

}
