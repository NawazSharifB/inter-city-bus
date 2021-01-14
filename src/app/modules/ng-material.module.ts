import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_FORMATS} from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const MODULES = [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatListModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatRadioModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatDialogModule,
    MatDividerModule,
    MatSnackBarModule
];


@NgModule({
    imports: [MODULES],
    exports: [MODULES],
    providers: [
        {
          provide: MAT_DATE_FORMATS,
          useValue: {
            parse: {
              dateInput: ['l', 'LL'],
            },
            display: {
              dateInput: 'L',
              monthYearLabel: 'MMM YYYY',
              dateA11yLabel: 'LL',
              monthYearA11yLabel: 'MMMM YYYY',
            },
          },
        },
      ]
})

export class NgMaterialModule {

}
