import { NgModule } from '@angular/core';

import { AppSharedModule } from './../app-shared/app-shared.module';
import { FullBusInfoComponent } from './components/full-bus-info/full-bus-info.component';

@NgModule({
    declarations: [
        FullBusInfoComponent
    ],
    imports: [
        AppSharedModule
    ],
    exports: [
        FullBusInfoComponent
    ]
  })
  export class AppAdminProprietorSharedModule { }
