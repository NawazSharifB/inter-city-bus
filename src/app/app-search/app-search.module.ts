import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppSharedModule } from './../app-shared/app-shared.module';

import { SearchBusComponent } from './components/search-bus/search-bus.component';
import { MainComponent } from './components/main/main.component';
import { FilterBusComponent } from './components/filter-bus/filter-bus.component';
import { BusTicketDetailsComponent } from './components/bus-ticket-details/bus-ticket-details.component';
import { BusListComponent } from './components/bus-list/bus-list.component';
import { AvailableBusComponent } from './components/available-bus/available-bus.component';


@NgModule({
    declarations: [
      AvailableBusComponent,
      BusListComponent,
      BusTicketDetailsComponent,
      FilterBusComponent,
      MainComponent,
      SearchBusComponent
    ],
    imports: [
      AppSharedModule,
      ReactiveFormsModule,
      RouterModule.forChild([
        { path: '', component: MainComponent }
      ])
    ],
    exports: []
  })
  export class AppSearchModule { }
