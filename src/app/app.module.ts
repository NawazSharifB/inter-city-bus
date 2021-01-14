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
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { AddEditBusComponent } from './components/add-edit-bus/add-edit-bus.component';
// import { RegisterComponent } from './components/register/register.component';
// import { NotFoundComponent } from './app-common/components/not-found/not-found.component';
// import { ServerErrorComponent } from './app-common/components/server-error/server-error.component';
// import { LoginComponent } from './components/login/login.component';
// import { FormatTimePipe } from './pipes/format-time.pipe';
// import { FormatIntegerTimePipe } from './pipes/format-integer-time.pipe';
// import { BusListComponent } from './components/bus-list/bus-list.component';
// import { MainComponent } from './app-initials/components/main/main.component';
// import { BusTicketDetailsComponent } from './components/bus-ticket-details/bus-ticket-details.component';
// import { SearchBusComponent } from './components/search-bus/search-bus.component';
// import { FilterBusComponent } from './app-initials/components/filter-bus/filter-bus.component';
// import { AvailableBusComponent } from './components/available-bus/available-bus.component';
// import { AdminPanelComponent } from './app-admin/components/admin-panel/admin-panel.component';
// import { AdminListComponent } from './app-admin/components/admin-list/admin-list.component';
// import { AddNewBusBrandComponent } from './components/add-new-bus-brand/add-new-bus-brand.component';
// import { CreateNewAdminComponent } from './components/create-new-admin/create-new-admin.component';
// import { ProprietorPanelComponent } from './app-proprietor/components/proprietor-panel/proprietor-panel.component';
// import { CreateNewModeratorComponent } from './app-proprietor/components/create-new-moderator/create-new-moderator.component';
// import { ProprietorAllBusListComponent } from './components/proprietor-all-bus-list/proprietor-all-bus-list.component';
// import { FullBusInfoComponent } from './components/full-bus-info/full-bus-info.component';
// import { AdminAllBusListComponent } from './components/admin-all-bus-list/admin-all-bus-list.component';
// import { LoginFormComponent } from './components/login-form/login-form.component';
// import { NavComponent } from './app-common/components/nav/nav.component';

// import { ErrorDialogComponent } from './error-handlers/error-dialog/error-dialog.component';
// import { PurchasedTicketDetailComponent } from './components/purchased-ticket-detail/purchased-ticket-detail.component';
// import { PuchaseHistoryComponent } from './components/puchase-history/puchase-history.component';
// import { FormatDatePipe} from './pipes/format-date.pipe';
// import { FormatPhonePipe} from './pipes/format-phone.pipe';
// import { ProprietorComponent } from './app-proprietor/components/proprietor/proprietor.component';
// import { AdminComponent } from './app-admin/components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    // AddEditBusComponent,
    // RegisterComponent,
    // NotFoundComponent,
    // ServerErrorComponent,
    // LoginComponent,
    // FormatTimePipe,
    // FormatIntegerTimePipe,
    // BusListComponent,
    // MainComponent,
    // BusTicketDetailsComponent,
    // SearchBusComponent,
    // FilterBusComponent,
    // AvailableBusComponent,
    // AdminPanelComponent,
    // AdminListComponent,
    // AddNewBusBrandComponent,
    // CreateNewAdminComponent,
    // ProprietorPanelComponent,
    // CreateNewModeratorComponent,
    // ProprietorAllBusListComponent,
    // FullBusInfoComponent,
    // AdminAllBusListComponent,
    // LoginFormComponent,
    // NavComponent,
    // ErrorDialogComponent,
    // PurchasedTicketDetailComponent,
    // PuchaseHistoryComponent,
    // FormatDatePipe,
    // FormatPhonePipe,
    // ProprietorComponent,
    // AdminComponent
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
