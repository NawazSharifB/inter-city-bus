import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppSharedModule } from './../app-shared/app-shared.module';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavComponent } from './components/nav/nav.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';


@NgModule({
    declarations: [
      ErrorDialogComponent,
      NavComponent,
      NotFoundComponent,
      ServerErrorComponent,
    ],
    imports: [
      CommonModule,
      AppSharedModule,
      ReactiveFormsModule,
      RouterModule,
    ],
    exports: [
      NavComponent,
      NotFoundComponent,
      ServerErrorComponent,
    ]
  })
  export class AppCommonModule { }
