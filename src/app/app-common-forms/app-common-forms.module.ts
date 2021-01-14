import { AppSharedModule } from './../app-shared/app-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
    declarations: [
        LoginFormComponent
    ],
    imports: [
        ReactiveFormsModule,
        AppSharedModule,
    ],
    exports: [
        LoginFormComponent
    ]
  })
  export class AppCommonFormsModule { }

