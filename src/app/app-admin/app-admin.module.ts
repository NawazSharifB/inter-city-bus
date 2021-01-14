import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppAdminProprietorSharedModule } from './../app-admin-proprietor-shared/app-admin-proprietor-shared.module';
import { AppSharedModule } from './../app-shared/app-shared.module';
import { AppAdminRoutingModule } from './app-admin-routing.module';

import { CreateNewAdminComponent } from './components/create-new-admin/create-new-admin.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { AdminAllBusListComponent } from './components/admin-all-bus-list/admin-all-bus-list.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddNewBusBrandComponent } from './components/add-new-bus-brand/add-new-bus-brand.component';


@NgModule({
    declarations: [
      AddNewBusBrandComponent,
      AdminComponent,
      AdminAllBusListComponent,
      AdminListComponent,
      AdminPanelComponent,
      CreateNewAdminComponent,
    ],
    imports: [
      RouterModule,
      ReactiveFormsModule,
      AppSharedModule,
      AppAdminProprietorSharedModule,
      AppAdminRoutingModule
    ],
    exports: []
  })
  export class AppAdminModule { }
