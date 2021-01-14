import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { AdminAllBusListComponent } from './components/admin-all-bus-list/admin-all-bus-list.component';
import { AddNewBusBrandComponent } from './components/add-new-bus-brand/add-new-bus-brand.component';
import { CreateNewAdminComponent } from './components/create-new-admin/create-new-admin.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';


const Routes = [
    {
        path: '', component: AdminComponent,
        children: [
            {path: 'panel', component: AdminPanelComponent},
            {path: 'admin-list', component: AdminListComponent},
            {path: 'new-admin', component: CreateNewAdminComponent},
            {path: 'new-bus-brand', component: AddNewBusBrandComponent},
            {path: 'all-bus-list', component: AdminAllBusListComponent},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule]
  })
  export class AppAdminRoutingModule { }
