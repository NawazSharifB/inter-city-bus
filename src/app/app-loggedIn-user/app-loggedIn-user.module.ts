import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppSharedModule } from './../app-shared/app-shared.module';
import { PurchasedTicketDetailComponent } from './components/purchased-ticket-detail/purchased-ticket-detail.component';
import { PuchaseHistoryComponent } from './components/puchase-history/puchase-history.component';


@NgModule({
    declarations: [
      PuchaseHistoryComponent,
      PurchasedTicketDetailComponent
    ],
    imports: [
      AppSharedModule,
      RouterModule.forChild([
        {path: 'purchase-history', component: PuchaseHistoryComponent}
      ])
    ],
    exports: []
  })
  export class AppLoggedInUserModule { }
