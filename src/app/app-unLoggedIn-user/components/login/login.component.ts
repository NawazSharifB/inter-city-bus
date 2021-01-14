import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { LoginInfoModel } from '../../../models/login-info.model';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // loginError = false;
  // invalidForm = false;
  // hidePasswordField = true;
  // loginForm: FormGroup;
  // constructor(
  //   private fb: FormBuilder,
  //   private userService: UserService,
  //   private authService: AuthService
  // ) { }

  // ngOnInit(): void {
  //   this.loginForm = this.fb.group({
  //     email: [null, [Validators.required]],
  //     password: [null, [Validators.required]]
  //   });
  // }


  // get email(): AbstractControl {
  //   return this.loginForm.get('email');
  // }

  // get password(): AbstractControl {
  //   return this.loginForm.get('password');
  // }

  // // for development only
  // // login() {
  // //   console.log(this.email);
  // //   console.log(this.password);
  // // }

  // login(): void {
  //   this.loginError = false;
  //   if (this.loginForm.invalid) {
  //     this.invalidForm = true;
  //     return;
  //   }

  //   this.userService.loginUser(this.loginForm.value)
  //     .subscribe(data => {
  //       console.log(data);
  //       this.authService.saveToken(data);
  //     }, error => {
  //       this.loginError = true;
  //       this.loginForm.reset();
  //       console.log(error);
  //   });

  // }

}
