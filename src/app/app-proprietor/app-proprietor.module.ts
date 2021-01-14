import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppSharedModule } from './../app-shared/app-shared.module';
import { AppProprietorRoutingModule } from './app-proprietor-routing.module';
import { AppAdminProprietorSharedModule } from './../app-admin-proprietor-shared/app-admin-proprietor-shared.module';

import { ProprietorPanelComponent } from './components/proprietor-panel/proprietor-panel.component';
import { ProprietorAllBusListComponent } from './components/proprietor-all-bus-list/proprietor-all-bus-list.component';
import { ProprietorComponent } from './components/proprietor/proprietor.component';
import { CreateNewModeratorComponent } from './components/create-new-moderator/create-new-moderator.component';
import { AddEditBusComponent } from './components/add-edit-bus/add-edit-bus.component';


@NgModule({
    declarations: [
      AddEditBusComponent,
      CreateNewModeratorComponent,
      ProprietorComponent,
      ProprietorAllBusListComponent,
      ProprietorPanelComponent,
    ],
    imports: [
      RouterModule,
      AppProprietorRoutingModule,
      AppAdminProprietorSharedModule,
      AppSharedModule,
      ReactiveFormsModule
    ],
    exports: []
  })
  export class AppProprietorModule { }
