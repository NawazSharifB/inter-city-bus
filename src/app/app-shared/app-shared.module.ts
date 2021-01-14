import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgMaterialModule } from './../modules/ng-material.module';

import { FormatDatePipe } from '../pipes/format-date.pipe';
import { FormatIntegerTimePipe } from '../pipes/format-integer-time.pipe';
import { FormatTimePipe } from '../pipes/format-time.pipe';
import { FormatPhonePipe } from '../pipes/format-phone.pipe';




@NgModule({
    declarations: [
      FormatDatePipe,
      FormatIntegerTimePipe,
      FormatTimePipe,
      FormatPhonePipe
    ],
    imports: [
      CommonModule,
      NgMaterialModule,
      FlexLayoutModule,
    ],
    exports: [
      CommonModule,
      NgMaterialModule,
      FlexLayoutModule,
      FormatDatePipe,
      FormatIntegerTimePipe,
      FormatTimePipe,
      FormatPhonePipe
    ]
  })
  export class AppSharedModule { }
