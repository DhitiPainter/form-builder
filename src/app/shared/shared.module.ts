import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCheckboxModule, MatCardModule, MatAutocompleteModule,
  MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule,
  MatChipsModule, MatIconModule, MatTooltipModule, MatSnackBarModule,
  MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter, MatDatepickerModule
} from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDatepickerModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDatepickerModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class SharedModule { }
