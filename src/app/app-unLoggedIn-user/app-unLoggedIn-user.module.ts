import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppSharedModule } from './../app-shared/app-shared.module';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AppCommonFormsModule } from '../app-common-forms/app-common-forms.module';


@NgModule({
    declarations: [
      LoginComponent,
      RegisterComponent
    ],
    imports: [
      ReactiveFormsModule,
      AppCommonFormsModule,
      AppSharedModule,
      RouterModule.forChild([
        {path: 'login', component: LoginComponent},
        {path: 'register', component: RegisterComponent}
      ])
    ],
    exports: []
  })
  export class AppUnLoggedInUserModule { }
