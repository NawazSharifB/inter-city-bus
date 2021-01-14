import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProprietorAllBusListComponent } from './components/proprietor-all-bus-list/proprietor-all-bus-list.component';
import { CreateNewModeratorComponent } from './components/create-new-moderator/create-new-moderator.component';
import { AddEditBusComponent, } from './components/add-edit-bus/add-edit-bus.component';
import { ProprietorPanelComponent } from './components/proprietor-panel/proprietor-panel.component';
import { ProprietorComponent } from './components/proprietor/proprietor.component';


const Router = [
    {path: '', component: ProprietorComponent,
    children: [
        {path: ':busName/panel', component: ProprietorPanelComponent},
        {path: ':busName/add-bus', component: AddEditBusComponent},
        {path: ':busName/edit-bus/:id', component: AddEditBusComponent},
        {path: ':busName/new-moderator', component: CreateNewModeratorComponent},
        {path: ':busName/all-bus-list', component: ProprietorAllBusListComponent},
    ]
  },
];


@NgModule({
    imports: [RouterModule.forChild(Router)],
    exports: [RouterModule]
  })
  export class AppProprietorRoutingModule { }
