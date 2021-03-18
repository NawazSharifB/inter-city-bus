import { AppCommonModule } from './app-common/app-common.module';
import { AuthenticationHeaderService } from './services/authentication-header.service';
import { AppErrorHandlerService } from './error-handlers/app-error-handler.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './modules/app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { NgMaterialModule } from './modules/ng-material.module';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { LayoutModule } from '@angular/cdk/layout';

import { AppCommonFormsModule } from './app-common-forms/app-common-forms.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,

    AppCommonModule,
    AppCommonFormsModule,
    NgMaterialModule,

    // FormsModule,
    // ReactiveFormsModule,
    HttpClientModule,
    AmazingTimePickerModule,
    LayoutModule,
  ],
  // entryComponents: [
  //   ErrorDialogComponent
  // ],
  providers: [
    {provide: ErrorHandler, useClass: AppErrorHandlerService},
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationHeaderService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
