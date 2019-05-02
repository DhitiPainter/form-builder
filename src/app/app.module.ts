import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { FormCreatorComponent } from './form-creator/form-creator.component';
import { DynamicFormGeneratorComponent } from './dynamic-form-generator/dynamic-form-generator.component';
import { FormService } from './common/service/form.service';
@NgModule({
  declarations: [
    AppComponent,
    FormCreatorComponent,
    DynamicFormGeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
